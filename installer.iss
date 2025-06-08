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
function InitializeUninstall(): Boolean;
var
  Form: TForm;
  PasswordLabel: TLabel;
  PasswordEdit: TEdit;
  OKButton, CancelButton: TButton;
  ResultCode: Integer;
begin
  Result := False;

  Form := CreateCustomForm;
  try
    Form.Caption := 'Uninstall Password';
    Form.ClientWidth := 300;
    Form.ClientHeight := 120;
    Form.Position := poScreenCenter;

    PasswordLabel := TLabel.Create(Form);
    PasswordLabel.Parent := Form;
    PasswordLabel.Caption := 'Enter password to uninstall:';
    PasswordLabel.Left := 10;
    PasswordLabel.Top := 20;
    PasswordLabel.Width := 280;

    PasswordEdit := TEdit.Create(Form);
    PasswordEdit.Parent := Form;
    PasswordEdit.PasswordChar := '*';
    PasswordEdit.Left := 10;
    PasswordEdit.Top := 45;
    PasswordEdit.Width := 280;

    OKButton := TButton.Create(Form);
    OKButton.Parent := Form;
    OKButton.Caption := 'OK';
    OKButton.ModalResult := mrOk;
    OKButton.Left := 130;
    OKButton.Top := 80;
    OKButton.Width := 75;

    CancelButton := TButton.Create(Form);
    CancelButton.Parent := Form;
    CancelButton.Caption := 'Cancel';
    CancelButton.ModalResult := mrCancel;
    CancelButton.Left := 210;
    CancelButton.Top := 80;
    CancelButton.Width := 75;

    ResultCode := Form.ShowModal;

    if ResultCode = mrOk then
    begin
      if PasswordEdit.Text = 'Rudranil@123' then
        Result := True
      else
      begin
        MsgBox('Incorrect password!', mbError, MB_OK);
        Result := False;
      end;
    end;
  finally
    Form.Free;
  end;
end;
