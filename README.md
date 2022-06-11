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

Разработка фронтенда для сервиса Datamp
Стек:
- Vue 3
- Typescript
- Pinia
- Quasar
- SSR

![1](https://user-images.githubusercontent.com/78386140/173198556-923cbadb-424b-4b6c-a468-074f9ab31e40.png)

![2](https://user-images.githubusercontent.com/78386140/173198562-1da53868-a96a-44a0-a177-58820dad0f95.png)

![3](https://user-images.githubusercontent.com/78386140/173198563-0a744c5f-23c9-474e-a51e-9a5393a7c9f5.png)

![4](https://user-images.githubusercontent.com/78386140/173198568-8d4be013-adb4-4bc4-b36b-7afe35f99fbb.png)

![5](https://user-images.githubusercontent.com/78386140/173198578-a0cb02b5-3315-4923-993b-7bc3cbae6470.png)




Переменная|Описание|Пример
----|----------|----------|
AGGRID_LICENSE|Ключ лицензии для таблиц `ag-grid`|some-license

## `.env` переменные для продакшена:

Переменная|Описание|Пример
----|----------|----------|
NGINX_PORT|Порт, на котором будет работать `nginx`|8000
