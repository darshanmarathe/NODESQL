del *.js
cls
call tsc index.ts -t es2015 -m commonjs
node index