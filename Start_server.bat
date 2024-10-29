@echo off

TIMEOUT 5

cd C:\Service_PLC
pm2 start Index.js
-1