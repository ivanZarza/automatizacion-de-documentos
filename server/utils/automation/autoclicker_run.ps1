
            Add-Type -AssemblyName System.Windows.Forms
            $startTime = [DateTime]::Now
            $windowWasFound = $false
            
            # Registrar APIs de Windows para bajo nivel
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
            
            Write-Host "MODO INTELIGENTE: Vigilando ventanas para clic en 922, 533..."
            
            while ($true) {
                try {
                    # 1. Comprobar Tiempo Límite (30s seguridad)
                    if (([DateTime]::Now - $startTime).TotalSeconds -gt 30) {
                        Write-Host "TIMEOUT: 30s alcanzados. Saliendo..."
                        break
                    }

                    # 2. Enumerar ventanas y buscar patrones
                    $wins = [Win32]::GetWindows()
                    $pattern = "Certificado|AutoFirma|Firma|Seguridad|Aceptar|almacen|Windows|Seleccione"
                    $match = $false
                    $foundTitle = ""
                    
                    foreach ($w in $wins) {
                        if ($w.Item2 -match $pattern) {
                            $match = $true
                            $foundTitle = $w.Item2
                        }
                    }

                    if ($match) {
                        Write-Host "!!! [MATCH] Detectada ventana: '$foundTitle'. Clickando en 922, 533..."
                        $windowWasFound = $true
                        
                        # Clic físico
                        [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(922, 533)
                        [Win32]::mouse_event(0x0002, 0, 0, 0, 0) # LeftDown
                        Start-Sleep -Milliseconds 50
                        [Win32]::mouse_event(0x0004, 0, 0, 0, 0) # LeftUp
                        
                        # Teclado redundante
                        [System.Windows.Forms.SendKeys]::SendWait('{ENTER}')
                    } else {
                        # Si ya se encontró alguna vez y ahora no hay nada, es que se ha cerrado con éxito
                        if ($windowWasFound) {
                            Write-Host "EXITO: La ventana ha desaparecido. Terminando..."
                            break
                        }
                    }
                } catch { 
                    Write-Host "Error en loop: $($_.Exception.Message)"
                }
                Start-Sleep -Seconds 2 # Revisar cada 2 segundos
            }
        