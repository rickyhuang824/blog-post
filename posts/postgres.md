---
title: "Postgres note"
date: "2024-03-29"
image: postgres.png
description: PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance.
isFeatured: true
---

# Database design process

1. what kind of thing are we storing?
2. what properties this thing have?
3. what type of data does each of those properties contain?

# Recommendation service

# Four relationships:

1. One to Many
2. Many to One
3. Many to Many
4. One to One

# Foreign Key

1. Foreign Key is used to Identify a record (usually in another table) that this row is associated with
2. The 'many' side of the relationship gets the foreign key column
3. Exactly equal to the primary key of the referenced row

# Serial Types:

create an auto-incrementing column
