# GitHub Copilot Notification Script
# This script creates attention-grabbing notifications

param(
    [string]$Message = "GitHub Copilot needs your attention! 🤖",
    [string]$Title = "VS Code - Copilot Alert",
    [int]$Duration = 10000
)

Write-Host "Sending Copilot notification..." -ForegroundColor Cyan

# Create system notification
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$notification = New-Object System.Windows.Forms.NotifyIcon
$notification.Icon = [System.Drawing.SystemIcons]::Exclamation
$notification.BalloonTipIcon = "Warning"
$notification.BalloonTipText = $Message
$notification.BalloonTipTitle = $Title
$notification.Visible = $true

# Show notification with sound
$notification.ShowBalloonTip($Duration)

# Play multiple attention-grabbing sounds
[System.Media.SystemSounds]::Exclamation.Play()
Start-Sleep -Milliseconds 500
[System.Media.SystemSounds]::Asterisk.Play()
Start-Sleep -Milliseconds 500
[System.Media.SystemSounds]::Beep.Play()

# Flash the VS Code window if it's running
$vscodeProcess = Get-Process -Name "Code" -ErrorAction SilentlyContinue
if ($vscodeProcess) {
    Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;
        public class Win32 {
            [DllImport("user32.dll")]
            public static extern bool FlashWindow(IntPtr hWnd, bool bInvert);
        }
"@
    
    foreach ($proc in $vscodeProcess) {
        [Win32]::FlashWindow($proc.MainWindowHandle, $true)
        Start-Sleep -Milliseconds 200
        [Win32]::FlashWindow($proc.MainWindowHandle, $false)
    }
}

Write-Host "Notification sent successfully!" -ForegroundColor Green
Write-Host "Attention sounds played" -ForegroundColor Yellow
Write-Host "VS Code window flashed (if running)" -ForegroundColor Magenta

# Keep notification visible
Start-Sleep -Seconds ($Duration / 1000)
$notification.Dispose()

Write-Host "Notification system is active and working!" -ForegroundColor White