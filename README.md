# Clockwise Clockware REST API

Данный API является частью учебного проекта по реализации вєб-приложения для приема заказов онлайн.

### Установка и запуск

**Шаг 1** - Клонируйте этот репозиторий
 ```sh
git clone https://github.com/joseffone/clockware-app.git
```
**Шаг 2** - Перейдите в папку **server**
 ```sh
cd server
```
**Шаг 3** - Установите зависимости
 ```sh
npm install
```
**Примечание:** Для перехода к следующему шагу установите MySQL локально
(ссылка для скачивания: https://www.mysql.com/downloads/) или, например, воспользуйтесь сервисом от HEROKU: https://elements.heroku.com/addons/cleardb.

**Шаг 4** - Создайте в папке **server** файл **.env**, в котором необходимо задать параметры подключения БД, JWT ключи и прочие параметры для корректной работы API. Содержимое **.env** файла должно быть следующим:
 ```sh
NODE_ENV=development
BASIC=basic

DB_DIALECT=mysql
DB_NAME=your_db_name
DB_HOST=your_host
DB_USER=username
DB_PASS=password
DB_PORT=3306

JWT_ACCESS_KEY=your_secret_key1
JWT_REFRESH_KEY=your_secret_key2
BCRYPT_SALT_ROUNDS=10

SERVER_PORT=3001
TIMEZONE="+03:00"
```

**Шаг 5** - Запустите сервер
 ```sh
npm start
```

### Описание модели данных
###
| Таблица\Модель | Поля\Атрибуты | Описание |
| :-------------: | :-----------: | :-------: |
| users | id, email, first\_name, last\_name, password, role\_id | Содержит данные зарегистрированных пользователей |
| agents | id, nickname, first\_name, last\_name, mark\_id | Содержит данные мастеров |
| marks | id, mark\_name, mark\_value | Справочник типов оценок мастеров |
| cloks | id, clock\_type, hours\_of\_repair | Справочник типов часов и соответствующего времени на ремонт |
| сities | id, city\_name | Справочник городов |
| сoverage | id, agent\_id, city\_id | Содержит данные о покрытии городов мастерами |
| orders | id, user\_id, clock\_id, city\_id, agent\_id, start\_date, eхpiration\_date, note | Содержит данные о заказах |
| keys | id, user\_id, refresh\_token | Содержит refresh-токены аутентифицированных пользователей |
| roles | id, role | Справочник ролей пользователей |
| permissions | id, role\_id, model, action | Содержит данные об установленных правах доступа |

### Пользователи и права доступа

В приложении поддерживаются следующие виды действий [actions] над данными:
+ **read** - чтение данных;
+ **create** - добавление/запись данных;
+ **update** - обновление данных;
+ **delete** - удаление данных;

Предусмотрены, также, базовые **типы/роли** пользователей:
+ **admin** - обладает полным доступом на чтение, запись, обновление и удаление данных;
+ **client** - права клиента. Обладает ограниченным доступом на удаление данных, а также, имеет доступ на создание заказов (orders);
+ **user** - права незарегистрированных/неаутентифицированных пользователей. Имеет ограниченный доступ на чтение данных и на создание пользователей (users) со статусом клиента (client);

Данные типы пользователей создаются по дефолту при первом запуске приложения. Им присваиваются следующие права доступа:

| Тип пользователя | Модель\Таблица | read | create | update | delete |
| :--------------: | :------------: | :--: | :----: | :----: | :----: |
| admin | users | + | + | + | + |
| admin | agents | + | + | + | + |
| admin | marks | + | + | + | + |
| admin | clocks | + | + | + | + |
| admin | cities | + | + | + | + |
| admin | coverage | + | + | + | + |
| admin | orders | + | + | + | + |
| admin | keys | + | + | + | + |
| admin | roles | + | + | + | + |
| admin | permissions | + | + | + | + |
| client | orders | - | + | - | - |
| user | agents | + | - | - | - |
| user | marks | + | - | - | - |
| user | clocks | + | - | - | - |
| user | cities | + | - | - | - |
| user | coverage | + | - | - | - |
| user | users | - | + | - | - |

Существующие типы/роли пользователей могут быть дополнены другими типами с соответствующими правами.
При первом запуске в системе создается пользователь со статусом **admin** и следующими атрибутами:
+ email: admin@mail.com
+ password: admin

Это является первой точкой входа в приложение. В целях безопасности, рекомендуется изменить пароль после первой аутентификации.

### Эндпоинты
###
| Метод | URL | Передаваемые параметры/данные | Описание |
| :---: | :-: | :---------------------------: | :------: |
| GET | /agents | query string (опционально) | получить список мастеров |
| GET | /freeagents | query string | получить список доступных мастеров |
| GET | /marks | query string (опционально) | получить список оценок мастеров |
| GET | /cities | query string (опционально) | получить список городов |
| GET | /clocks | query string (опционально) | получить список типов часов |
| GET | /users | query string (опционально) | получить список пользователей |
| GET | /coverage | query string (опционально) | получить список покрытий |
| GET | /orders | query string (опционально) | получить список заказов |
| GET | /roles | query string (опционально) | получить список ролей |
| GET | /permissions | query string (опционально) | получить список прав доступа |
| GET | /refresh | - | обновить access и refresh токены |
| GET | /agent/:id | :id | получить запись по id |
| GET | /mark/:id | :id | получить запись по id |
| GET | /city/:id | :id | получить запись по id |
| GET | /clock/:id | :id | получить запись по id |
| GET | /user/:id | :id | получить запись по id |
| GET | /coverage/:id | :id | получить запись по id |
| GET | /order/:id | :id | получить запись по id |
| GET | /role/:id | :id | получить запись по id |
| GET | /permission/:id | :id | получить запись по id |
| POST | /agent | JSON | добавить запись |
| POST | /mark | JSON | добавить запись |
| POST | /city | JSON | добавить запись |
| POST | /clock | JSON | добавить запись |
| POST | /signup | JSON | добавить запись/создать пользователя |
| POST | /login | JSON | аутентифицировать пользователя, получить access и refresh токены |
| POST | /coverage | JSON | добавить запись |
| POST | /order | JSON | добавить запись/создать заказ |
| POST | /role | JSON | добавить запись |
| POST | /permission | JSON | добавить запись |
| PATCH | /agent/:id | JSON | обновить запись |
| PATCH | /mark/:id | JSON | обновить запись |
| PATCH | /city/:id | JSON | обновить запись |
| PATCH | /clock/:id | JSON | обновить запись |
| PATCH | /user/:id | JSON | обновить запись |
| PATCH | /coverage/:id | JSON | обновить запись |
| PATCH | /order/:id | JSON | обновить запись |
| PATCH | /role/:id | JSON | обновить запись |
| PATCH | /permission/:id | JSON | обновить запись |
| DELETE | /agent/:id | :id | удалить запись |
| DELETE | /mark/:id | :id | удалить запись |
| DELETE | /city/:id | :id | удалить запись |
| DELETE | /clock/:id | :id | удалить запись |
| DELETE | /user/:id | :id | удалить запись |
| DELETE | /coverage/:id | :id | удалить запись |
| DELETE | /order/:id | :id | удалить запись |
| DELETE | /role/:id | :id | удалить запись |
| DELETE | /permission/:id | :id | удалить запись |
| DELETE | /logout | - | удалить запись/refresh токен |

Коллекция запросов в POSTMAN находится по ссылке: https://www.getpostman.com/collections/0ca66009e0b757352488
