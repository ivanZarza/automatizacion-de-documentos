
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
            
            Write-Host "MODO INTELIGENTE: Vigilando ventanas para clic en 923, 536..."
            
            while ($true) {
                try {
                    if (([DateTime]::Now - $startTime).TotalSeconds -gt 90) {
                        Write-Host "TIMEOUT: 90s alcanzados. Saliendo..."
                        break
                    }

                    $wins = [Win32]::GetWindows()
                    $pattern = "Certificado|AutoFirma|Firma|Seguridad|almacen|Seleccione|Seleccionar"
                    $targetHwnd = [IntPtr]::Zero
                    $foundTitle = ""
                    
                    foreach ($w in $wins) {
                        if ($w.Item2 -match $pattern) {
                            $targetHwnd = $w.Item1
                            $foundTitle = $w.Item2
                            break
                        }
                    }

                    if ($targetHwnd -ne [IntPtr]::Zero) {
                        Write-Host "!!! [MATCH] Detectada: '$foundTitle'. Trayendo al frente y clicando en 923, 536..."
                        $windowWasFound = $true

                        $n = 0
                        while ($true) {
                            $abierta = $false
                            $currentHwnd = [IntPtr]::Zero
                            foreach ($w2 in ([Win32]::GetWindows())) {
                                if ($w2.Item2 -match $pattern) { $abierta = $true; $currentHwnd = $w2.Item1; break }
                            }
                            if (-not $abierta) {
                                Write-Host "EXITO: Ventana cerrada tras $n clics."
                                break
                            }
                            # Traer la ventana al frente ANTES de clicar
                            [Win32]::ShowWindow($currentHwnd, 9) | Out-Null
                            [Win32]::SetForegroundWindow($currentHwnd) | Out-Null
                            Start-Sleep -Milliseconds 200
                            # Posicionar y clicar
                            [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(923, 536)
                            [Win32]::mouse_event(0x0002, 0, 0, 0, 0)
                            Start-Sleep -Milliseconds 50
                            [Win32]::mouse_event(0x0004, 0, 0, 0, 0)
                            $n++
                            Write-Host "   -> Clic #$n en 923,536"
                            Start-Sleep -Milliseconds 500
                        }
                        break
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
        