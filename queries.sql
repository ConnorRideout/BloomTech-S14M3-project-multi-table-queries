-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT
    pr.ProductName,
    ca.CategoryName
FROM Product as pr
JOIN Category as ca
    ON pr.CategoryId = ca.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT
    ord.Id,
    ship.CompanyName
FROM 'Order' as ord
JOIN Shipper as ship
    ON ord.ShipVia = ship.Id
WHERE ord.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT
    prod.ProductName,
    ord.Quantity
FROM OrderDetail as ord
JOIN Product as prod
    ON ord.ProductId = prod.Id
WHERE ord.OrderId = 10251
ORDER BY prod.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT
    ord.Id as Order_ID,
    cust.CompanyName as Customer_Company_Name,
    emp.LastName as Employee_Last_Name
FROM 'Order' as ord
LEFT JOIN Customer as cust
    ON ord.CustomerId = cust.Id
LEFT JOIN Employee as emp
    ON ord.EmployeeId = emp.Id;