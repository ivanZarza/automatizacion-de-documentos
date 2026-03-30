Add-Type -AssemblyName System.Windows.Forms
Write-Host "--- PULSA CTRL+C PARA PARAR ---"
while($true) {
  $pos = [System.Windows.Forms.Cursor]::Position
  Write-Host "Coordenadas actuales: X: $($pos.X), Y: $($pos.Y)"
  Start-Sleep -Milliseconds 250
}
