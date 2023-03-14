# Currency Conversion

The company has a cloud-hosted WordPress site, without any self-controlled backend. They 
want to add new functionality to their website which will allow their users to ask to get a 
conversion of an amount in 1 currency, to another.

- [Stack](#stack)
- [Install](#install)
- [Execute](#execute)

<br />

## Stack
- Node.js
- Squiss TS
- TypeScript
- Prettier
- ESLint
- Axios
- Nodemailer

<br />

## Install

Make sure to have currently installed Docker:
```
docker --version
```

Install the application dependencies:
```
yarn install
```

Make sure if your code is able to be deployed:
```
yarn lint:fix && yarn format:fix
```

Build the production code:
```
yarn build
```

Build and up the current code to Docker:
```
docker-compose up --build
```

<br />

## Execute

After building the source code you must be able to access the API requests, here's an example using CURL:

```
curl --request POST \
  --url http://localhost:3000/currency/conversion \
  --header 'Content-Type: application/json' \
  --data '{
	"from": "EUR",
	"to": "BRL",
	"amount": 2300
}'
```

To be implementend on Wordpress you can easily use some library as properly CURL:

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_PORT => "3000",
  CURLOPT_URL => "http://localhost:3000/currency/conversion",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"from\": \"EUR\",\n\t\"to\": \"BRL\",\n\t\"amount\": 2300\n}",
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

Or HTTP1:

```php
<?php

$request = new HttpRequest();
$request->setUrl('http://localhost:3000/currency/conversion');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders([
  'Content-Type' => 'application/json'
]);

$request->setBody('{
	"from": "EUR",
	"to": "BRL",
	"amount": 2300
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```