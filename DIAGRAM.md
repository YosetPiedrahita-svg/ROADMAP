# Diagrama Entidad-Relación

```mermaid
erDiagram
    USER ||--|{ TASK : "1 ..*"

  class USER {
        string id PK
        string email
        string name
        string photoURL
        timestamp created "Timestamp de Firestore"
        boolean is_active
        boolean is_online
    }

    TASK {
        string id PK
        string userID FK
        string title
        string description
        string status "pending, active, disable"
        datetime created_at
        datetime due_date
        string priority "high, low, medium"
    }
```
