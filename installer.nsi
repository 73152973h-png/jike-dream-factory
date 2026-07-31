!include "MUI2.nsh"
Name "Jike Studio v1.0.0"
OutFile "release\Jike-Setup.exe"
InstallDir "$PROGRAMFILES\JikeStudio"
RequestExecutionLevel admin
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"
Section "Install"
  SetOutPath "$INSTDIR"
  File /r "release\win-unpacked\*.*"
  CreateShortCut "$DESKTOP\Jike Studio.lnk" "$INSTDIR\jike.exe"
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd
Section "Uninstall"
  Delete "$DESKTOP\Jike Studio.lnk"
  RMDir /r "$INSTDIR"
SectionEnd