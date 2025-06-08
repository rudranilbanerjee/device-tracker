[Setup]
AppName=Device Tracker
AppVersion=1.0.0
DefaultDirName={pf}\Device Tracker
DefaultGroupName=Device Tracker
OutputBaseFilename=DeviceTrackerInstaller
DisableDirPage=no
UninstallDisplayIcon={app}\icon.ico
Uninstallable=yes
UninstallLogMode=append
AppPublisher=Your Name
OutputDir=dist
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin

[Files]
; ✅ Include the icon file from the project root assets folder
Source: "assets\icon.ico"; DestDir: "{app}"; Flags: ignoreversion

; ✅ Include the Electron app build output
Source: "out\device-tracker-win32-x64\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\Device Tracker"; Filename: "{app}\device-tracker.exe"

[Code]
// ✅ Password prompt during uninstall
function InitializeUninstall(): Boolean;
var
  Password: String;
begin
  Password := '';
  if InputBox('Uninstall Password', 'Enter password to uninstall:', Password) then
  begin
    if Password = 'Rudranil@123' then
    begin
      Result := True; // Correct password
    end
    else
    begin
      MsgBox('Incorrect password!', mbError, MB_OK);
      Result := False; // Incorrect
    end;
  end
  else
  begin
    Result := False; // User cancelled
  end;
end;
