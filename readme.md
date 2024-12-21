# FINAL EXAM

## Team Name: Fluffy Unicorns

## Team Members:

- Nguyễn Ngọc Thạch 2201700077
- Hoàng Anh 2201700173
- Lê Đức Long 2201700192

## Project Github Link: [https://github.com/Suppleo/Fluffy-Unicorns---Hotel-Management-Web-App](https://github.com/Suppleo/Fluffy-Unicorns---Hotel-Management-Web-App)

## Site Map
![Site Map](https://github.com/user-attachments/assets/2638283b-dec5-4443-8ecc-aff2086e7670)

## Database Schema: Service Table

| Attribute     | Description             | Data Type       | Constraints                             |
|---------------|-------------------------|-----------------|-----------------------------------------|
| ServiceID     | Unique service ID       | serial          | PK, Auto-increment                     |
| ServiceName   | Service name            | varchar(100)    |                                         |
| ServiceType   | Type of service         | varchar(50)     |                                         |
| Unit          | Unit of service         | varchar(20)     |                                         |
| UnitPrice     | Price per unit          | numeric(10,2)   | Default: 0.00, Check (UnitPrice >= 0)  |
| Description   | Description of the service | text          |
