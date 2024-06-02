# Warehouse Management System
This project is a Warehouse Management System designed to help customers track the movement of stock in and out of their warehouses.

## Technologies Used
- TypeScript
- NodeJS
- GraphQL
- PostgreSQL

## Running the app

```bash
cd scripts
$ sh start-warehouse.sh
```

## Accessing the API and Swagger
* Product API: http://localhost:3000/api
* Warehouse GraphQL API: http://localhost:3001/graphql
* Customer API: http://localhost:3002/api
* Inventory Processing API: http://localhost:3003/api
* Calculation API(Mock): http://localhost:3004/api
* RabbitMQ: http://localhost:15672 (username: guest, password: guest)

PostgreSQL Config
```
{
  "host": "localhost",
  "port": 5432,
  "username": "warehouse",
  "password": "postgres",
  "database": "warehouse"
}
```

## Following examples can be used to test the APIs.

```
-For Customer-
id: 1f8a54fd-97d0-4005-ba98-b6b30c47ca3d
{
  "name": "John",
  "surname": "Doe",
  "companyName": "Acme Inc",
  "email": "john.doe@acme.com"
}

-For Product-
id: bc536632-2e20-4ce4-a8a5-fc1aee65f5d3
{
  "name": "AcmeProduct",
  "unit": 10,
  "isHazardous": true
}

-For Shipment-
warehouseId: 1
{
  "productId": "bc536632-2e20-4ce4-a8a5-fc1aee65f5d3",
  "shipmentType": "IMPORT",
  "shipmentDate": "2024-06-02T18:32:28Z",
  "quantity": 5
}

-For Warehouse-
query WarehouseQuery {
    getWarehouses {
        name
        location,
		capacity,
		isActive
    }
}

query WarehouseByIdQuery {
    getWarehouseById(warehouseId: 1) {
        name,
        location,
        capacity,
		isActive
    }
}

mutation WarehouseMutation {
  createWarehouse(
    warehouseDto: {
      customerId: "1f8a54fd-97d0-4005-ba98-b6b30c47ca3d"
      name: "acme-warehouse"
      location: "Germany"
      capacity: 10
      isActive: true
    }
  ) {
    name
    location
  }
}
```