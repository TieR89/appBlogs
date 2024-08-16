#!/usr/bin/env sh

# остановка выполнения при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# если вы деплоите на пользовательский домен
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# если вы деплоите по адресу https://TieR89.github.io
# git push -f git@github.com:TieR89/TieR89.github.io.git main

# если вы деплоите по адресу https://TieR89.github.io/appblogs
git push -f git@github.com:TieR89/appblogs.git master:gh-pages

cd -
