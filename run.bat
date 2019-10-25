del *.js
cls
call tsc newTest.ts -t es2015 -m commonjs
node newTest