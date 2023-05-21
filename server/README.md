**System Architecture**
`It would be fair to refer to the combination of using MySQL for Flask backend and SQLite for local
storage in the React Native application as part of the overall system architecture. `



**SQLite**: React Native provides the react-native-sqlite-storage package, which allows you to use SQLite as a local database in our app.
You can create tables and store specific data from your Flask backend in SQLite
tables on the mobile device. 

**REST API caching**: Instead of storing specific data in local storage, you can leverage React Native's network capabilities to fetch and cache the data from your Flask backend API. Whenever the app needs to access the specific data, it can make a request to the Flask backend API. You can implement a caching mechanism in your app to store the response data temporarily and avoid unnecessary network requests.

**Design database schema**: Plan and design your database schema carefully, 
considering the entities, relationships, and data requirements of application.
Ensure that the schema is compatible with both MySQL and SQLite databases.


**Use SQLAlchemy:** Using **SQLAlchemy ORM** in Flask backend provides a consistent way to work 
with different database engines, including MySQL and SQLite. 
Utilize SQLAlchemy's capabilities to define our database models, 
perform database operations, and handle the differences between the two database engines.


**Manage database migrations**: If we anticipate making changes to the database schema over time, 
consider using a database migration tool like **Alembic**. 
It helps track and manage database schema changes, 
allowing us to apply these changes to both your MySQL backend and SQLite local storage.

**Data synchronization**: Determine how and when you want to synchronize data between your MySQL 
backend and SQLite local storage. This could involve periodically pulling data from the backend
to update the local storage or handling data synchronization during specific app events.


**Handle offline scenarios:** Keep in mind that the React Native app may occasionally be offline.
Design app to gracefully handle scenarios where the app cannot connect to the backend database.
This could involve caching data locally in SQLite and implementing offline functionality or 
providing appropriate error handling and feedback to the user.


**Security considerations**: When dealing with sensitive data, 
ensure that appropriate security measures are in place for both MySQL backend and 
SQLite local storage. Implement proper authentication, authorization, 
and data encryption techniques to protect user information and maintain data integrity.


**System Architecture Definition**: The design and organization of various components, technologies, 
and subsystems that work together to achieve the desired functionality and meet the requirements 
of the system.


1. **Flask Backend:** Backend server implemented in Flask, which uses MySQL as the primary
database engine. Handling requests from React Native app, performs business logic, and interacts
with the MySQL database.
2. **MySQL Database:**  The MySQL database stores the main data for our application. It is responsible
for managing the persistence and retrieval of data and is typically hosted on our cloud server (AWS)
3. **React Native App:** The mobile app developed using React Native, which communicates
with the Flask backend API to fetch data and perform actions. Utilizes SQLite as a local storage
mechanism to store specific data locally on the mobile device.
4. **SQLite Local Storage:** SQLite serves as the local storage solution within the React Native app. 
It stores data locally on the mobile device, allowing the app to operate offline or to provide
a more responsive user experience by caching data.