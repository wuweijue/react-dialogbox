@echo off  
chcp 65001 > nul  
set "source_dir=D:\project\react-dialogbox\dist"  
set "target_dir=D:\project\main\public\react-dialogbox"  
  
echo 正在清空目标目录...  
  
REM 清空目标目录  
RD /S /Q "%target_dir%"  
mkdir "%target_dir%"  
  
echo 正在复制文件...  
  
xcopy /E /I /Y "%source_dir%" "%target_dir%"  
  
echo 文件复制完成！  
  
pause