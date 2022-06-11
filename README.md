# frontend3
Фронтенд на `vue3` `quasar`

> `dist` также заносим в репозиторий, чтобы лишний раз не билдить на сервере

## Requirements
1. [Docker](https://docs.docker.com/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Node](https://nodejs.org/en/)

## How to install it?
1. Clone the repository:

```
$ git clone https://github.com/marketplace-analytics/frontend3.git
```

2. Go to the cloned directory:
```
$ cd frontend3
```
3. Go to the app directory:
```
$ cd app
```
4. Install dependicies:
```
$ yarn
```
5. Fill the `.env` file:
```
$ cp .example_env .env
```

### Production
6. Build spa:
```
$ yarn build
```
7. Return to main directory:
```
$ cd ..
```
8. Fill the deploy `.env` file:
```
$ cp .example_env .env
```
9. Run the application:
```
$ docker-compose up -d
```

### Development
> По умолчанию запускается на 8000

> По умолчанию прокси на бекенд - `http://localhost`

6. Run dev server:
```
$ yarn dev
```

## Storybook

> Нужно решить вопрос подключения `pinia` к `storybook`

### Dev-mode
```
$ yarn storybook
```
### Build-mode
```
$ yarn build-storybook
```

## `.env` переменные для `spa`:

Переменная|Описание|Пример
----|----------|----------|
AGGRID_LICENSE|Ключ лицензии для таблиц `ag-grid`|some-license

## `.env` переменные для продакшена:

Переменная|Описание|Пример
----|----------|----------|
NGINX_PORT|Порт, на котором будет работать `nginx`|8000
