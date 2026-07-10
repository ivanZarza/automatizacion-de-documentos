
            Add-Type -AssemblyName System.Windows.Forms
            $startTime = [DateTime]::Now
            $windowWasFound = $false
            
            Add-Type @"
              using System;
              using System.Text;
              using System.Collections.Generic;
              using System.Runtime.InteropServices;

              public class Win32 {
                public delegate bool EnumWindowProc(IntPtr hWnd, IntPtr parameter);

                [DllImport("user32.dll")]
                public static extern bool EnumWindows(EnumWindowProc lpEnumFunc, IntPtr lParam);

                [DllImport("user32.dll", CharSet = CharSet.Auto)]
                public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

                [DllImport("user32.dll")]
                public static extern bool IsWindowVisible(IntPtr hWnd);

                [DllImport("user32.dll")]
                public static extern bool SetForegroundWindow(IntPtr hWnd);

                [DllImport("user32.dll")]
                public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

                [DllImport("user32.dll")]
                public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);

                [StructLayout(LayoutKind.Sequential)]
                public struct RECT {
                  public int Left;
                  public int Top;
                  public int Right;
                  public int Bottom;
                }

                [DllImport("user32.dll")]
                public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);

                public static List<ValueTuple<IntPtr, string>> GetWindows() {
                  var list = new List<ValueTuple<IntPtr, string>>();
                  EnumWindows((hWnd, lParam) => {
                    if (IsWindowVisible(hWnd)) {
                      StringBuilder sb = new StringBuilder(256);
                      GetWindowText(hWnd, sb, 256);
                      string t = sb.ToString();
                      if (!string.IsNullOrEmpty(t)) list.Add(new ValueTuple<IntPtr, string>(hWnd, t));
                    }
                    return true;
                  }, IntPtr.Zero);
                  return list;
                }
              }
"@
            
            function IsTargetWindow($title) {
                $dialogPattern = "^(Seleccionar certificado|Confirmar certificado|AutoFirma|Solicitud de certificado|Seguridad de Windows|Selecciona un certificado|Selección de certificado)"
                $chromePattern = "(Google Chrome|Chromium|Microsoft Edge)"
                
                $isDialog = $title -match $dialogPattern
                $isChromeWithPrompt = ($title -match "Firma|Certificado|Seguridad|almacen") -and ($title -match $chromePattern)
                
                return $isDialog -or $isChromeWithPrompt
            }

            Write-Host "MODO INTELIGENTE: Vigilando ventanas para interactuar..."
            
            while ($true) {
                try {
                    if (([DateTime]::Now - $startTime).TotalSeconds -gt 120) {
                        Write-Host "TIMEOUT: 120s alcanzados. Saliendo..."
                        break
                    }

                    $wins = [Win32]::GetWindows()
                    $targetHwnd = [IntPtr]::Zero
                    $foundTitle = ""
                    
                    foreach ($w in $wins) {
                        if (IsTargetWindow $w.Item2) {
                            $targetHwnd = $w.Item1
                            $foundTitle = $w.Item2
                            break
                        }
                    }

                    if ($targetHwnd -ne [IntPtr]::Zero) {
                        $windowWasFound = $true

                        if ($foundTitle -match "(Google Chrome|Chromium|Microsoft Edge)") {
                            Write-Host "!!! [MATCH] Detectado Navegador con Prompt: '$foundTitle'. Trayendo al frente y enviando ENTER..."
                            [Win32]::ShowWindow($targetHwnd, 9) | Out-Null
                            [Win32]::SetForegroundWindow($targetHwnd) | Out-Null
                            Start-Sleep -Milliseconds 250
                            
                            $wshell = New-Object -ComObject WScript.Shell
                            $wshell.SendKeys("{ENTER}")
                            Start-Sleep -Milliseconds 500
                        } else {
                            Write-Host "!!! [MATCH] Detectado Diálogo Nativo: '$foundTitle'. Trayendo al frente e interactuando..."
                            $n = 0
                            while ($true) {
                                $abierta = $false
                                $currentHwnd = [IntPtr]::Zero
                                foreach ($w2 in ([Win32]::GetWindows())) {
                                    $esDialogoNativo = ($w2.Item2 -match "^(Seleccionar certificado|Confirmar certificado|AutoFirma|Solicitud de certificado|Seguridad de Windows|Selecciona un certificado|Selección de certificado)")
                                    if ($esDialogoNativo -and $w2.Item1 -eq $targetHwnd) { 
                                        $abierta = $true
                                        $currentHwnd = $w2.Item1
                                        break 
                                    }
                                }
                                if (-not $abierta) {
                                    Write-Host "EXITO: Ventana cerrada tras $n interacciones."
                                    break
                                }
                                [Win32]::ShowWindow($currentHwnd, 9) | Out-Null
                                [Win32]::SetForegroundWindow($currentHwnd) | Out-Null
                                Start-Sleep -Milliseconds 250

                                $rect = New-Object Win32+RECT
                                if ([Win32]::GetWindowRect($currentHwnd, [ref]$rect)) {
                                    $wWidth = $rect.Right - $rect.Left
                                    $wHeight = $rect.Bottom - $rect.Top
                                    $centerX = $rect.Left + [int]($wWidth / 2)
                                    $centerY = $rect.Top + [int]($wHeight / 2)

                                    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($centerX, $centerY)
                                    [Win32]::mouse_event(0x0002, 0, 0, 0, 0)
                                    Start-Sleep -Milliseconds 50
                                    [Win32]::mouse_event(0x0004, 0, 0, 0, 0)
                                    Start-Sleep -Milliseconds 150
                                }

                                $wshell = New-Object -ComObject WScript.Shell
                                $wshell.SendKeys("{ENTER}")

                                $n++
                                Write-Host "   -> Interacción #$n realizada en la ventana nativa"
                                Start-Sleep -Milliseconds 600
                            }
                        }
                    } else {
                        if ($windowWasFound) {
                            Write-Host "EXITO: La ventana ha desaparecido. Terminando..."
                            break
                        }
                    }
                } catch { 
                    Write-Host "Error en loop: $($_.Exception.Message)"
                }
                Start-Sleep -Seconds 1
            }