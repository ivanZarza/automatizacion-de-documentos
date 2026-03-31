import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Utilidad para automatizar clics en diálogos del sistema (Windows) 
 * que Playwright no puede alcanzar (Certificados, AutoFirma, etc.)
 */
class WindowsAutoClicker {
    constructor() {
        this.process = null;
        this.active = false;
        this.isWindows = os.platform() === 'win32';

        if (!this.isWindows) {
            console.log(' [AutoClicker] Sistema no-Windows detectado. Funcionando en modo pasivo (sin auto-clics).');
        }
        // Títulos de ventana a detectar en español
        this.targetTitles = [
            'Seleccionar certificado',
            'Confirmar certificado',
            'AutoFirma',
            'Solicitud de certificado',
            'Seguridad de Windows',
            'Selecciona un certificado'
        ];
    }

    /**
     * Inicia un proceso PowerShell en segundo plano que monitoriza las ventanas
     */
    start() {
        if (this.active) return;
        if (!this.isWindows) return;
        this.active = true;

        const psPath = path.join(process.cwd(), 'server', 'utils', 'automation', 'autoclicker_run.ps1');

        const psScript = `
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
                        Write-Host "!!! [MATCH] Detectada ventana: '$foundTitle'. Clickando en 923, 536..."
                        $windowWasFound = $true
                        
                        # Clic físico
                        [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(923, 536)
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
        `;

        try {
            fs.writeFileSync(psPath, psScript);
            console.log(` [AutoClicker] Script PS1 guardado en: ${psPath}`);
        } catch (err) {
            console.error('   [!] Error guardando script de autoclicker:', err.message);
        }

        this.process = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', psPath]);

        console.log(` [AutoClicker] Proceso PowerShell iniciado (PID: ${this.process.pid})`);

        this.process.stdout.on('data', (data) => {
            console.log(` [PS Log] ${data.toString().trim()}`);
        });

        this.process.stderr.on('data', (data) => {
            console.error(` [PS Error] ${data.toString().trim()}`);
        });

        this.process.on('error', (err) => {
            console.error('   [!] Error en el proceso AutoClicker:', err.message);
        });
    }

    /**
     * Detiene el monitor
     */
    stop() {
        if (this.process) {
            // Matar el árbol de procesos de PowerShell (solo en Windows)
            if (this.isWindows) {
                spawn('taskkill', ['/pid', this.process.pid, '/f', '/t']);
            }
            this.process = null;
        }
        this.active = false;
        console.log('[AutoClicker] 🛑 Monitorización detenida.');
    }
}

export const autoClicker = new WindowsAutoClicker();
