"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { jsPDF } from "jspdf";
import { FiCheckCircle, FiShare2, FiBarChart, FiAward, FiZap, FiTarget, FiRefreshCw, FiLock, FiBookOpen, FiEdit, FiSearch, FiMessageSquare, FiCode } from "react-icons/fi";
import { MdOutlineQuiz, MdDownload, MdStar, MdAccessTime, MdLeaderboard, MdTrendingUp, MdHistory } from "react-icons/md";
import Link from "next/link";

// --- Constants & Types (No change) ---
type Question = {
  id: string; q: string; options: string[]; answer: number; topic: string; difficulty: "Easy" | "Medium" | "Hard";
};
type LeaderboardEntry = {
    name: string; displayName: string; role: string; score: number; time: number; badge: string;
};
type UserData = {
    streak: number; badges: string[]; level: "Beginner" | "Intermediate" | "Expert" | "Master";
};

// --- DATA: MASSIVELY EXPANDED QUIZ_DATA (15-20 Questions per subject) ---
const QUIZ_DATA: Record<string, Question[]> = {
  "HTML/CSS/JS": [
    { id: "wd-001", q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup", "Hyperlinks Text Markup", "HighText Machine Lang"], answer: 0, topic: "HTML Basics", difficulty: "Easy" },
    { id: "wd-002", q: "Which CSS property changes text color?", options: ["font-weight", "color", "text-style", "font-color"], answer: 1, topic: "CSS Styling", difficulty: "Easy" },
    { id: "wd-003", q: "Which hook is used for state in React?", options: ["useEffect", "useState", "useContext", "useRef"], answer: 1, topic: "React Hooks", difficulty: "Medium" },
    { id: "wd-004", q: "Which is a JS package manager?", options: ["NPM", "HTTP", "TCP", "SSH"], answer: 0, topic: "JavaScript Tooling", difficulty: "Easy" },
    { id: "wd-010", q: "Which meta tag is important for responsive pages?", options: ["<meta name='viewport' ...>", "<meta charset>", "<meta robots>", "<meta refresh>"], answer: 0, topic: "HTML Advanced", difficulty: "Medium" },
    { id: "wd-011", q: "What is the correct tag for a line break?", options: ["<lb>", "<br>", "<break>", "<newline>"], answer: 1, topic: "HTML Basics", difficulty: "Easy" },
    { id: "wd-012", q: "How do you select an element with id 'header' in CSS?", options: [".header", "#header", "header", "*header"], answer: 1, topic: "CSS Selectors", difficulty: "Easy" },
    { id: "wd-013", q: "What keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "static"], answer: 2, topic: "JavaScript Basics", difficulty: "Easy" },
    { id: "wd-014", q: "Which method prevents default action in JS?", options: ["e.stopAction()", "e.preventDefault()", "e.blockDefault()", "e.halt()"], answer: 1, topic: "JavaScript DOM", difficulty: "Medium" },
    { id: "wd-015", q: "What is a 'prop' in React?", options: ["Private variable", "Function argument passed to a component", "Local state", "Component instance"], answer: 1, topic: "React Basics", difficulty: "Medium" },
    { id: "wd-016", q: "Which array method executes a provided function once for each array element?", options: ["filter()", "map()", "forEach()", "reduce()"], answer: 2, topic: "JavaScript Advanced", difficulty: "Medium" },
    { id: "wd-017", q: "What is CSS specificity?", options: ["Order of CSS files", "Weight of a CSS rule", "Time complexity", "Element count"], answer: 1, topic: "CSS Advanced", difficulty: "Hard" },
    { id: "wd-018", q: "Which command starts a new Git repository?", options: ["git start", "git begin", "git new", "git init"], answer: 3, topic: "Tooling/Git", difficulty: "Easy" },
    { id: "wd-019", q: "Which HTTP method is idempotent?", options: ["POST", "PUT", "PATCH", "CONNECT"], answer: 1, topic: "Web Protocols", difficulty: "Hard" },
    { id: "wd-020", q: "What is the purpose of 'rel=preload'?", options: ["Define external links", "Load resources faster", "Set canonical URL", "Optimize image rendering"], answer: 1, topic: "Web Performance", difficulty: "Hard" },
    { id: "wd-021", q: "What is 'shadow DOM'?", options: ["Hidden JavaScript code", "Encapsulated DOM structure", "Legacy DOM standard", "A CSS preprocessor"], answer: 1, topic: "Web Components", difficulty: "Hard" },
    { id: "wd-022", q: "Which React hook handles side effects?", options: ["useState", "useContext", "useEffect", "useMemo"], answer: 2, topic: "React Hooks", difficulty: "Medium" },
    { id: "wd-023", q: "What does 'Babel' primarily do?", options: ["A JavaScript framework", "A transpiler", "A database connector", "A testing utility"], answer: 1, topic: "JavaScript Tooling", difficulty: "Medium" },
    { id: "wd-024", q: "In CSS Grid, what property defines column gaps?", options: ["grid-spacing", "column-gap", "grid-gap-column", "gap-col"], answer: 1, topic: "CSS Layout", difficulty: "Easy" },
    { id: "wd-025", q: "What does SQL stand for?", options: ["Sequential Query Language", "Structured Query Logic", "Standard Query Link", "Structured Query Language"], answer: 3, topic: "Databases (Basics)", difficulty: "Easy" },
  ],
  "Python": [
    { id: "py-001", q: "Which module is used to work with dates and times?", options: ["timeit", "datetime", "sys", "os"], answer: 1, topic: "Core Modules", difficulty: "Easy" },
    { id: "py-002", q: "How do you correctly define a function?", options: ["func my_func():", "def my_func:", "function my_func:", "define my_func():"], answer: 1, topic: "Syntax", difficulty: "Easy" },
    { id: "py-003", q: "Which data type is mutable?", options: ["Tuple", "String", "List", "Frozen Set"], answer: 2, topic: "Data Types", difficulty: "Medium" },
    { id: "py-004", q: "Which statement is used for exception handling?", options: ["catch", "try-except", "throw", "error"], answer: 1, topic: "Exception Handling", difficulty: "Easy" },
    { id: "py-005", q: "What is the result of `10 // 3`?", options: ["3.33", "3", "4", "3.0"], answer: 1, topic: "Operators", difficulty: "Easy" },
    { id: "py-006", q: "Which library is used for data manipulation and analysis?", options: ["NumPy", "Pandas", "Matplotlib", "Requests"], answer: 1, topic: "Data Science", difficulty: "Medium" },
    { id: "py-007", q: "What is a 'decorator'?", options: ["A design theme", "A function that modifies another function", "A class method", "A variable type"], answer: 1, topic: "Advanced Concepts", difficulty: "Hard" },
    { id: "py-008", q: "How do you open a file for reading in Python?", options: ["open('f', 'w')", "read('f')", "open('f', 'r')", "file('f')"], answer: 2, topic: "File I/O", difficulty: "Easy" },
    { id: "py-009", q: "What is the primary purpose of `__init__` in a class?", options: ["Destructor", "Class method", "Constructor", "Static method"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "py-010", q: "Which framework is popular for web development in Python?", options: ["Django", "React", "Spring", "Express"], answer: 0, topic: "Web Frameworks", difficulty: "Medium" },
    { id: "py-011", q: "What does 'pip' stand for?", options: ["Python Installation Program", "Preferred Installer Program", "Package Integration Process", "Python Interpreter Platform"], answer: 1, topic: "Tooling", difficulty: "Easy" },
    { id: "py-012", q: "What is a dictionary key restricted to?", options: ["Lists", "Any data type", "Integers", "Immutable types"], answer: 3, topic: "Data Types", difficulty: "Hard" },
    { id: "py-013", q: "Which keyword is used to implement inheritance?", options: ["extends", "inherits", ":", "no keyword, use parenthesis"], answer: 3, topic: "OOP", difficulty: "Medium" },
    { id: "py-014", q: "What does the `yield` keyword do?", options: ["Returns a value and terminates the function", "Creates a generator", "Forces garbage collection", "Defines a lambda function"], answer: 1, topic: "Advanced Concepts", difficulty: "Hard" },
    { id: "py-015", q: "What is the purpose of `self` in class methods?", options: ["Reference the class itself", "Reference the instance of the class", "A reserved keyword", "A globally accessible variable"], answer: 1, topic: "OOP", difficulty: "Easy" },
  ],
  "C": [
    { id: "c-001", q: "Which keyword is used to allocate memory dynamically?", options: ["sizeOf", "new", "alloc", "malloc"], answer: 3, topic: "Memory Management", difficulty: "Medium" },
    { id: "c-002", q: "What is the format specifier for a character?", options: ["%d", "%s", "%c", "%f"], answer: 2, topic: "I/O", difficulty: "Easy" },
    { id: "c-003", q: "Arrays in C are stored in:", options: ["Stack", "Heap", "Contiguous memory locations", "Linked list"], answer: 2, topic: "Data Structures", difficulty: "Medium" },
    { id: "c-004", q: "What is the output of `sizeof(char)`?", options: ["1 byte", "2 bytes", "4 bytes", "Depends on OS"], answer: 0, topic: "Operators", difficulty: "Easy" },
    { id: "c-005", q: "Which loop is guaranteed to execute at least once?", options: ["for loop", "while loop", "do-while loop", "if-else"], answer: 2, topic: "Control Flow", difficulty: "Easy" },
    { id: "c-006", q: "Which header file is essential for using `malloc()`?", options: ["stdio.h", "string.h", "stdlib.h", "math.h"], answer: 2, topic: "Core Libraries", difficulty: "Medium" },
    { id: "c-007", q: "Pointers are stored in the memory as:", options: ["Character data", "Integer data", "Hexadecimal data", "Memory addresses"], answer: 3, topic: "Pointers", difficulty: "Medium" },
    { id: "c-008", q: "The term 'Automatic variable' refers to variables stored on the:", options: ["Heap", "Stack", "Global memory", "Register"], answer: 1, topic: "Memory Management", difficulty: "Hard" },
    { id: "c-009", q: "What is the purpose of the `volatile` keyword?", options: ["Makes a variable permanent", "Prevents optimization of a variable", "Declares a global variable", "Initializes a pointer"], answer: 1, topic: "Keywords", difficulty: "Hard" },
    { id: "c-010", q: "Which storage class has the shortest lifetime?", options: ["static", "extern", "auto", "register"], answer: 2, topic: "Storage Classes", difficulty: "Medium" },
    { id: "c-011", q: "The return type of `main()` must be:", options: ["void", "float", "int", "char"], answer: 2, topic: "Functions", difficulty: "Easy" },
    { id: "c-012", q: "What is the size of a pointer variable in C?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the architecture"], answer: 3, topic: "Pointers", difficulty: "Hard" },
    { id: "c-013", q: "How do you declare a constant in C?", options: ["const int x = 5;", "constant x = 5;", "define x 5;", "Both 1 and 3"], answer: 3, topic: "Keywords", difficulty: "Easy" },
    { id: "c-014", q: "A structure in C is a collection of elements of:", options: ["Same data type", "Different data types", "Only integers", "Only user-defined types"], answer: 1, topic: "Data Structures", difficulty: "Easy" },
    { id: "c-015", q: "Which operator is used to get the value at a memory address?", options: ["&", "#", "*", "->"], answer: 2, topic: "Pointers", difficulty: "Medium" },
  ],
  "C++": [
    { id: "cpp-001", q: "Which operator is used for dynamic memory deallocation?", options: ["free", "delete", "clear", "dispose"], answer: 1, topic: "Memory Management", difficulty: "Medium" },
    { id: "cpp-002", q: "What does 'cout' stand for?", options: ["Character Output", "Console Output", "Class Output", "Common Utility"], answer: 1, topic: "I/O", difficulty: "Easy" },
    { id: "cpp-003", q: "Which concept supports function overloading?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], answer: 2, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "cpp-004", q: "The default access specifier for class members is:", options: ["public", "protected", "private", "friend"], answer: 2, topic: "OOP Basics", difficulty: "Easy" },
    { id: "cpp-005", q: "Which header is required for `std::cout`?", options: ["cstdio", "iostream", "sstream", "cstdlib"], answer: 1, topic: "I/O", difficulty: "Easy" },
    { id: "cpp-006", q: "A class template is used to implement:", options: ["Inheritance", "Generics", "Polymorphism", "Virtual functions"], answer: 1, topic: "Templates", difficulty: "Hard" },
    { id: "cpp-007", q: "The 'virtual' keyword is used to achieve:", options: ["Compile-time polymorphism", "Run-time polymorphism", "Encapsulation", "Abstraction"], answer: 1, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "cpp-008", q: "What is RAII (Resource Acquisition Is Initialization)?", options: ["A design pattern for resource management", "A form of manual memory allocation", "A threading model", "A standard library"], answer: 0, topic: "Advanced Concepts", difficulty: "Hard" },
    { id: "cpp-009", q: "Which container provides efficient random access?", options: ["std::list", "std::vector", "std::map", "std::queue"], answer: 1, topic: "STL", difficulty: "Medium" },
    { id: "cpp-010", q: "What is the size of an empty class in C++?", options: ["0 bytes", "1 byte", "4 bytes", "Depends on compiler"], answer: 1, topic: "OOP", difficulty: "Medium" },
    { id: "cpp-011", q: "Which smart pointer handles shared ownership?", options: ["std::unique_ptr", "std::auto_ptr", "std::shared_ptr", "std::weak_ptr"], answer: 2, topic: "Memory Management", difficulty: "Hard" },
    { id: "cpp-012", q: "The 'explicit' keyword is used to prevent:", options: ["Implicit conversion", "Method overriding", "Dynamic allocation", "Template instantiation"], answer: 0, topic: "Keywords", difficulty: "Medium" },
    { id: "cpp-013", q: "Which statement skips the rest of the current loop iteration?", options: ["break", "exit", "continue", "return"], answer: 2, topic: "Control Flow", difficulty: "Easy" },
    { id: "cpp-014", q: "What is the relationship between a class and an object?", options: ["Object is a blueprint of a class", "Class is an instance of an object", "Class is a blueprint of an object", "They are identical"], answer: 2, topic: "OOP Basics", difficulty: "Easy" },
    { id: "cpp-015", q: "A virtual destructor is important to avoid:", options: ["Memory leaks in base/derived class scenarios", "Deadlocks", "Stack overflow", "Syntax errors"], answer: 0, topic: "OOP Concepts", difficulty: "Hard" },
  ],
  "Java": [
    { id: "java-001", q: "Which keyword is used to prevent method overriding?", options: ["static", "abstract", "final", "const"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-002", q: "Java is compiled to:", options: ["Native Machine Code", "Assembly Code", "Bytecode", "Interpreted Script"], answer: 2, topic: "Platform", difficulty: "Easy" },
    { id: "java-003", q: "What is the base class for all Java classes?", options: ["Class", "Main", "Object", "System"], answer: 2, topic: "OOP Basics", difficulty: "Medium" },
    { id: "java-004", q: "Which method is the starting point for execution?", options: ["init()", "start()", "run()", "main()"], answer: 3, topic: "Platform", difficulty: "Easy" },
    { id: "java-005", q: "Which access modifier allows access only within the same package?", options: ["public", "private", "protected", "default (package-private)"], answer: 3, topic: "Access Modifiers", difficulty: "Medium" },
    { id: "java-006", q: "What does JVM stand for?", options: ["Java Virtual Memory", "Java Vector Machine", "Just Validated Module", "Java Virtual Machine"], answer: 3, topic: "Platform", difficulty: "Easy" },
    { id: "java-007", q: "Which exception is handled at compile time?", options: ["RuntimeException", "IOException", "NullPointerException", "IndexOutOfBoundsException"], answer: 1, topic: "Exception Handling", difficulty: "Hard" },
    { id: "java-008", q: "A 'marker interface' is an interface with:", options: ["No methods or constants", "Only static methods", "Only abstract methods", "A single default method"], answer: 0, topic: "Interfaces", difficulty: "Medium" },
    { id: "java-009", q: "The keyword used to invoke the parent class constructor is:", options: ["this()", "parent()", "super()", "base()"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-010", q: "Which data structure is synchronized and thread-safe?", options: ["ArrayList", "LinkedList", "Vector", "HashMap"], answer: 2, topic: "Collections", difficulty: "Hard" },
    { id: "java-011", q: "What is the size of the boolean data type in Java?", options: ["1 byte", "2 bytes", "1 bit", "Implementation-dependent"], answer: 3, topic: "Data Types", difficulty: "Medium" },
    { id: "java-012", q: "Garbage collection in Java is primarily responsible for:", options: ["Destructing objects", "Managing memory manually", "Freeing up memory used by unreferenced objects", "Optimizing compilation"], answer: 2, topic: "Memory Management", difficulty: "Easy" },
    { id: "java-013", q: "Which statement ensures a block of code runs regardless of exceptions?", options: ["throws", "catch", "finally", "return"], answer: 2, topic: "Exception Handling", difficulty: "Easy" },
    { id: "java-014", q: "What is an abstract method?", options: ["A static method", "A method with a body", "A method without a body", "A final method"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-015", q: "How does Java achieve platform independence?", options: ["By using a specialized compiler", "By compiling to Bytecode", "By implementing native OS calls", "By running directly on hardware"], answer: 1, topic: "Platform", difficulty: "Medium" },
  ],
  "SQL": [
    { id: "sql-001", q: "Which command is used to retrieve data from a database?", options: ["EXTRACT", "OPEN", "GET", "SELECT"], answer: 3, topic: "DQL", difficulty: "Easy" },
    { id: "sql-002", q: "Which keyword removes all rows from a table, retaining structure?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], answer: 3, topic: "DDL/DML", difficulty: "Medium" },
    { id: "sql-003", q: "What is a primary key?", options: ["A foreign key", "A column that uniquely identifies a row", "A descriptive index", "A composite key"], answer: 1, topic: "Database Design", difficulty: "Easy" },
    { id: "sql-004", q: "Which type of join returns only matching rows from both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"], answer: 3, topic: "Joins", difficulty: "Medium" },
    { id: "sql-005", q: "Which clause is used to filter records after aggregation?", options: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], answer: 3, topic: "Advanced Queries", difficulty: "Hard" },
    { id: "sql-006", q: "What does DDL stand for?", options: ["Data Definition Language", "Data Duplication Language", "Database Design Logic", "Data Query Language"], answer: 0, topic: "Concepts", difficulty: "Easy" },
    { id: "sql-007", q: "Which command modifies the definition of a table?", options: ["UPDATE", "MODIFY TABLE", "ALTER TABLE", "CHANGE TABLE"], answer: 2, topic: "DDL", difficulty: "Easy" },
    { id: "sql-008", q: "What is a Foreign Key?", options: ["A key used for encryption", "A key that links two tables", "The primary key of the current table", "A unique index"], answer: 1, topic: "Database Design", difficulty: "Medium" },
    { id: "sql-009", q: "Which function calculates the average of values?", options: ["SUM", "COUNT", "AVG", "MEAN"], answer: 2, topic: "Aggregate Functions", difficulty: "Easy" },
    { id: "sql-010", q: "The command used to permanently save changes made to a database:", options: ["SAVE", "COMMIT", "ROLLBACK", "TRANSACTION"], answer: 1, topic: "TCL", difficulty: "Medium" },
    { id: "sql-011", q: "A database index is primarily used to:", options: ["Encrypt data", "Speed up data retrieval", "Reduce table size", "Enforce data types"], answer: 1, topic: "Database Design", difficulty: "Medium" },
    { id: "sql-012", q: "Which constraint ensures all values in a column are different?", options: ["NOT NULL", "CHECK", "UNIQUE", "DEFAULT"], answer: 2, topic: "Constraints", difficulty: "Easy" },
    { id: "sql-013", q: "Which join returns all rows from the left table and matched rows from the right?", options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL JOIN"], answer: 2, topic: "Joins", difficulty: "Medium" },
    { id: "sql-014", q: "The command used to grant a user permission to access a database object is:", options: ["ALLOW", "SET", "GRANT", "PERMIT"], answer: 2, topic: "DCL", difficulty: "Hard" },
    { id: "sql-015", q: "What is a 'View' in SQL?", options: ["A physical table stored on disk", "A virtual table based on the result-set of an SQL statement", "A stored procedure", "A database schema"], answer: 1, topic: "Database Concepts", difficulty: "Medium" },
  ],
  "MongoDB": [
    { id: "mongo-001", q: "MongoDB stores data as:", options: ["JSON documents", "Tables", "XML files", "Key-value pairs"], answer: 0, topic: "Basics", difficulty: "Easy" },
    { id: "mongo-002", q: "The equivalent of a 'Table' in MongoDB is a:", options: ["Database", "Collection", "Document", "Index"], answer: 1, topic: "Concepts", difficulty: "Medium" },
    { id: "mongo-003", q: "Which method is used for updating documents?", options: ["db.collection.modify()", "db.collection.update()", "db.collection.edit()", "db.collection.replace()"], answer: 1, topic: "CRUD", difficulty: "Medium" },
    { id: "mongo-004", q: "Which field is automatically added to every document as the primary key?", options: ["_id", "primaryKey", "docId", "key"], answer: 0, topic: "Basics", difficulty: "Easy" },
    { id: "mongo-005", q: "What is the primary way to perform complex data manipulation?", options: ["Aggregation Pipeline", "Find/Limit commands", "Manual JS loops", "SQL Queries"], answer: 0, topic: "Advanced Queries", difficulty: "Hard" },
    { id: "mongo-006", q: "MongoDB is an example of what type of database?", options: ["Relational", "Graph", "Document-Oriented (NoSQL)", "Key-Value"], answer: 2, topic: "Concepts", difficulty: "Easy" },
    { id: "mongo-007", q: "Which command inserts a single document?", options: ["db.col.addOne()", "db.col.insertSingle()", "db.col.insertOne()", "db.col.create()"], answer: 2, topic: "CRUD", difficulty: "Easy" },
    { id: "mongo-008", q: "What property allows a field to contain an array of sub-documents?", options: ["Embedded Array", "Array Field", "Nested Document", "List Schema"], answer: 0, topic: "Schema Design", difficulty: "Medium" },
    { id: "mongo-009", q: "Which method removes all documents matching a filter?", options: ["db.col.deleteMany()", "db.col.removeAll()", "db.col.removeMany()", "db.col.deleteBulk()"], answer: 0, topic: "CRUD", difficulty: "Medium" },
    { id: "mongo-010", q: "Sharding in MongoDB is used for:", options: ["Data encryption", "Vertical scaling", "Horizontal scaling", "Data backup"], answer: 2, topic: "Architecture", difficulty: "Hard" },
    { id: "mongo-011", q: "What is the default isolation level in MongoDB transactions?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Snapshot"], answer: 1, topic: "Transactions", difficulty: "Hard" },
    { id: "mongo-012", q: "Which aggregation stage performs filtering?", options: ["$group", "$project", "$match", "$sort"], answer: 2, topic: "Aggregation", difficulty: "Medium" },
    { id: "mongo-013", q: "The write concern 'majority' ensures data is written to:", options: ["The primary node only", "All nodes", "A majority of voting members", "Only secondary nodes"], answer: 2, topic: "Architecture", difficulty: "Hard" },
    { id: "mongo-014", q: "How do you define a one-to-many relationship in MongoDB?", options: ["Joins", "Reference embedding", "Primary/Foreign Keys", "Schema normalization"], answer: 1, topic: "Schema Design", difficulty: "Medium" },
    { id: "mongo-015", q: "GridFS is primarily used for storing:", options: ["Small strings", "User data", "Binary large objects (BLOBs)", "Indexes"], answer: 2, topic: "Storage", difficulty: "Medium" },
  ],
  "PHP": [
    { id: "php-001", q: "PHP statements must end with a:", options: ["Dot", "Comma", "Semicolon", "Colon"], answer: 2, topic: "Syntax", difficulty: "Easy" },
    { id: "php-002", q: "Which symbol starts a variable name?", options: ["$", "@", "#", "&"], answer: 0, topic: "Variables", difficulty: "Easy" },
    { id: "php-003", q: "Which function includes content from another file?", options: ["require()", "include()", "import()", "Both 1 and 2"], answer: 3, topic: "Includes", difficulty: "Medium" },
    { id: "php-004", q: "What is used for outputting text in PHP?", options: ["print", "echo", "write", "Both 1 and 2"], answer: 3, topic: "I/O", difficulty: "Easy" },
    { id: "php-005", q: "Which function is used to start a session?", options: ["start_session()", "session_begin()", "session_start()", "new_session()"], answer: 2, topic: "Web Concepts", difficulty: "Medium" },
    { id: "php-006", q: "Which array type uses named keys?", options: ["Indexed", "Associative", "Multidimensional", "Sequential"], answer: 1, topic: "Data Types", difficulty: "Easy" },
    { id: "php-007", q: "The operator `===` checks for:", options: ["Equality only", "Assignment", "Equality and type", "Inequality"], answer: 2, topic: "Operators", difficulty: "Medium" },
    { id: "php-008", q: "Which superglobal holds information about headers, paths, and script locations?", options: ["$_SESSION", "$_GET", "$_POST", "$_SERVER"], answer: 3, topic: "Superglobals", difficulty: "Medium" },
    { id: "php-009", q: "How do you define a constant?", options: ["const MY_CONST = 1;", "define('MY_CONST', 1);", "constant MY_CONST = 1;", "Both 1 and 2"], answer: 3, topic: "Constants", difficulty: "Easy" },
    { id: "php-010", q: "The term used for defining a required base structure for a class is:", options: ["Trait", "Interface", "Abstract Class", "Extension"], answer: 1, topic: "OOP", difficulty: "Hard" },
    { id: "php-011", q: "What does the `->` operator refer to?", options: ["Static class member", "Object property/method", "Pointer reference", "Array index"], answer: 1, topic: "OOP", difficulty: "Medium" },
    { id: "php-012", q: "Which loop is designed for iterating over array elements?", options: ["for", "while", "do-while", "foreach"], answer: 3, topic: "Control Flow", difficulty: "Easy" },
    { id: "php-013", q: "Which is the most secure way to interact with a database?", options: ["Direct SQL concatenation", "Using prepared statements", "URL parameters", "Global variables"], answer: 1, topic: "Security", difficulty: "Hard" },
    { id: "php-014", q: "What function is used to validate an email address format?", options: ["is_email()", "validate_email()", "filter_var()", "check_mail()"], answer: 2, topic: "Functions", difficulty: "Medium" },
    { id: "php-015", q: "Which version of PHP introduced strict typing and better OOP features?", options: ["PHP 4", "PHP 5", "PHP 7", "PHP 8"], answer: 2, topic: "History", difficulty: "Hard" },
  ],
  "Go": [
    { id: "go-001", q: "Go routines are:", options: ["OS Threads", "Heavyweight Processes", "Lightweight Threads", "Functions"], answer: 2, topic: "Concurrency", difficulty: "Hard" },
    { id: "go-002", q: "The keyword to define a function is:", options: ["define", "function", "func", "fn"], answer: 2, topic: "Syntax", difficulty: "Easy" },
    { id: "go-003", q: "What is Go's tool for code formatting?", options: ["go vet", "go format", "gofmt", "go tidy"], answer: 2, topic: "Tooling", difficulty: "Medium" },
    { id: "go-004", q: "The default value of an uninitialized string in Go is:", options: ["null", "'' (empty string)", "undefined", "zero"], answer: 1, topic: "Data Types", difficulty: "Easy" },
    { id: "go-005", q: "Which statement is used for concurrency communication?", options: ["goroutine", "thread", "channel", "sync"], answer: 2, topic: "Concurrency", difficulty: "Medium" },
    { id: "go-006", q: "Go achieves polymorphism through:", options: ["Class inheritance", "Method overloading", "Interfaces", "Generics"], answer: 2, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "go-007", q: "What is the package name for the main executable?", options: ["pkg", "main", "core", "start"], answer: 1, topic: "Syntax", difficulty: "Easy" },
    { id: "go-008", q: "The assignment operator used for short variable declaration is:", options: ["=", ":=", "=>", "=="], answer: 1, topic: "Operators", difficulty: "Easy" },
    { id: "go-009", q: "What is the purpose of the `defer` statement?", options: ["To pause execution", "To run a function after the surrounding function returns", "To define a recursive function", "To handle exceptions"], answer: 1, topic: "Control Flow", difficulty: "Medium" },
    { id: "go-010", q: "Which keyword is used to start a new concurrent process?", options: ["newThread", "parallel", "goroutine", "go"], answer: 3, topic: "Concurrency", difficulty: "Medium" },
    { id: "go-011", q: "What is a 'Slice' in Go?", options: ["A fixed-size array", "A dynamic array wrapper around an array", "A pointer to an array", "A type of map"], answer: 1, topic: "Data Structures", difficulty: "Medium" },
    { id: "go-012", q: "Go's error handling philosophy relies heavily on:", options: ["Try-catch blocks", "Exceptions", "Returning error values", "Global error flags"], answer: 2, topic: "Error Handling", difficulty: "Hard" },
    { id: "go-013", q: "The primary tool used to build Go programs is:", options: ["go run", "go build", "go install", "All of the above"], answer: 3, topic: "Tooling", difficulty: "Easy" },
    { id: "go-014", q: "What is the zero value of an integer (`int`)?", options: ["1", "null", "0", "nil"], answer: 2, topic: "Data Types", difficulty: "Easy" },
    { id: "go-015", q: "What are 'Structs' in Go?", options: ["Built-in complex data types", "User-defined composite types", "Functions that operate on interfaces", "A concurrency primitive"], answer: 1, topic: "Data Structures", difficulty: "Medium" },
  ],
  "C++": [
    { id: "cpp-001", q: "Which operator is used for dynamic memory deallocation?", options: ["free", "delete", "clear", "dispose"], answer: 1, topic: "Memory Management", difficulty: "Medium" },
    { id: "cpp-002", q: "What does 'cout' stand for?", options: ["Character Output", "Console Output", "Class Output", "Common Utility"], answer: 1, topic: "I/O", difficulty: "Easy" },
    { id: "cpp-003", q: "Which concept supports function overloading?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], answer: 2, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "cpp-004", q: "The default access specifier for class members is:", options: ["public", "protected", "private", "friend"], answer: 2, topic: "OOP Basics", difficulty: "Easy" },
    { id: "cpp-005", q: "Which header is required for `std::cout`?", options: ["cstdio", "iostream", "sstream", "cstdlib"], answer: 1, topic: "I/O", difficulty: "Easy" },
    { id: "cpp-006", q: "A class template is used to implement:", options: ["Inheritance", "Generics", "Polymorphism", "Virtual functions"], answer: 1, topic: "Templates", difficulty: "Hard" },
    { id: "cpp-007", q: "The 'virtual' keyword is used to achieve:", options: ["Compile-time polymorphism", "Run-time polymorphism", "Encapsulation", "Abstraction"], answer: 1, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "cpp-008", q: "What is RAII (Resource Acquisition Is Initialization)?", options: ["A design pattern for resource management", "A form of manual memory allocation", "A threading model", "A standard library"], answer: 0, topic: "Advanced Concepts", difficulty: "Hard" },
    { id: "cpp-009", q: "Which container provides efficient random access?", options: ["std::list", "std::vector", "std::map", "std::queue"], answer: 1, topic: "STL", difficulty: "Medium" },
    { id: "cpp-010", q: "What is the size of an empty class in C++?", options: ["0 bytes", "1 byte", "4 bytes", "Depends on compiler"], answer: 1, topic: "OOP", difficulty: "Medium" },
    { id: "cpp-011", q: "Which smart pointer handles shared ownership?", options: ["std::unique_ptr", "std::auto_ptr", "std::shared_ptr", "std::weak_ptr"], answer: 2, topic: "Memory Management", difficulty: "Hard" },
    { id: "cpp-012", q: "The 'explicit' keyword is used to prevent:", options: ["Implicit conversion", "Method overriding", "Dynamic allocation", "Template instantiation"], answer: 0, topic: "Keywords", difficulty: "Medium" },
    { id: "cpp-013", q: "Which statement skips the rest of the current loop iteration?", options: ["break", "exit", "continue", "return"], answer: 2, topic: "Control Flow", difficulty: "Easy" },
    { id: "cpp-014", q: "What is the relationship between a class and an object?", options: ["Object is a blueprint of a class", "Class is an instance of an object", "Class is a blueprint of an object", "They are identical"], answer: 2, topic: "OOP Basics", difficulty: "Easy" },
    { id: "cpp-015", q: "A virtual destructor is important to avoid:", options: ["Memory leaks in base/derived class scenarios", "Deadlocks", "Stack overflow", "Syntax errors"], answer: 0, topic: "OOP Concepts", difficulty: "Hard" },
  ],
  "C": [
    { id: "c-001", q: "Which keyword is used to allocate memory dynamically?", options: ["sizeOf", "new", "alloc", "malloc"], answer: 3, topic: "Memory Management", difficulty: "Medium" },
    { id: "c-002", q: "What is the format specifier for a character?", options: ["%d", "%s", "%c", "%f"], answer: 2, topic: "I/O", difficulty: "Easy" },
    { id: "c-003", q: "Arrays in C are stored in:", options: ["Stack", "Heap", "Contiguous memory locations", "Linked list"], answer: 2, topic: "Data Structures", difficulty: "Medium" },
    { id: "c-004", q: "What is the output of `sizeof(char)`?", options: ["1 byte", "2 bytes", "4 bytes", "Depends on OS"], answer: 0, topic: "Operators", difficulty: "Easy" },
    { id: "c-005", q: "Which loop is guaranteed to execute at least once?", options: ["for loop", "while loop", "do-while loop", "if-else"], answer: 2, topic: "Control Flow", difficulty: "Easy" },
    { id: "c-006", q: "Which header file is essential for using `malloc()`?", options: ["stdio.h", "string.h", "stdlib.h", "math.h"], answer: 2, topic: "Core Libraries", difficulty: "Medium" },
    { id: "c-007", q: "Pointers are stored in the memory as:", options: ["Character data", "Integer data", "Hexadecimal data", "Memory addresses"], answer: 3, topic: "Pointers", difficulty: "Medium" },
    { id: "c-008", q: "The term 'Automatic variable' refers to variables stored on the:", options: ["Heap", "Stack", "Global memory", "Register"], answer: 1, topic: "Memory Management", difficulty: "Hard" },
    { id: "c-009", q: "What is the purpose of the `volatile` keyword?", options: ["Makes a variable permanent", "Prevents optimization of a variable", "Declares a global variable", "Initializes a pointer"], answer: 1, topic: "Keywords", difficulty: "Hard" },
    { id: "c-010", q: "Which storage class has the shortest lifetime?", options: ["static", "extern", "auto", "register"], answer: 2, topic: "Storage Classes", difficulty: "Medium" },
    { id: "c-011", q: "The return type of `main()` must be:", options: ["void", "float", "int", "char"], answer: 2, topic: "Functions", difficulty: "Easy" },
    { id: "c-012", q: "What is the size of a pointer variable in C?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the architecture"], answer: 3, topic: "Pointers", difficulty: "Hard" },
    { id: "c-013", q: "How do you declare a constant in C?", options: ["const int x = 5;", "constant x = 5;", "define x 5;", "Both 1 and 3"], answer: 3, topic: "Keywords", difficulty: "Easy" },
    { id: "c-014", q: "A structure in C is a collection of elements of:", options: ["Same data type", "Different data types", "Only integers", "Only user-defined types"], answer: 1, topic: "Data Structures", difficulty: "Easy" },
    { id: "c-015", q: "Which operator is used to get the value at a memory address?", options: ["&", "#", "*", "->"], answer: 2, topic: "Pointers", difficulty: "Medium" },
  ],
  "AI/ML": [
    { id: "ai-001", q: "What does 'ML' stand for?", options: ["Machine Learning", "Model Logic", "Memory Load", "Matrix Labs"], answer: 0, topic: "ML Basics", difficulty: "Easy" },
    { id: "ai-002", q: "Which library is popular for neural networks?", options: ["Pandas", "TensorFlow", "Flask", "Express"], answer: 1, topic: "Deep Learning", difficulty: "Medium" },
    { id: "ai-003", q: "Supervised learning uses:", options: ["Labeled data", "Unlabeled data", "No data", "Only images"], answer: 0, topic: "ML Types", difficulty: "Easy" },
    { id: "ai-004", q: "Which algorithm is for clustering?", options: ["K-Means", "Linear Regression", "Logistic Regression", "Decision Tree"], answer: 0, topic: "Unsupervised Learning", difficulty: "Medium" },
    { id: "ai-007", q: "Which is dimensionality reduction technique?", options: ["PCA", "SVM", "RNN", "CNN"], answer: 0, topic: "Data Preprocessing", difficulty: "Hard" },
    { id: "ai-009", q: "Which optimizes neural nets?", options: ["Gradient Descent", "Binary Search", "DFS", "BFS"], answer: 0, topic: "Optimization", difficulty: "Hard" },
    { id: "ai-011", q: "What is the primary purpose of a validation set?", options: ["Training the model", "Testing the final model performance", "Tuning model hyperparameters", "Data cleaning"], answer: 2, topic: "Model Evaluation", difficulty: "Medium" },
    { id: "ai-012", q: "Which metric is best for imbalanced classification data?", options: ["Accuracy", "Precision", "Recall", "F1 Score"], answer: 3, topic: "Model Evaluation", difficulty: "Hard" },
    { id: "ai-013", q: "The term 'Epoch' in deep learning refers to:", options: ["One pass through all test data", "One pass through the entire training dataset", "The batch size", "The learning rate"], answer: 1, topic: "Deep Learning", difficulty: "Medium" },
    { id: "ai-014", q: "Which type of network is most suitable for sequence data like text?", options: ["CNN", "RNN", "Perceptron", "Autoencoder"], answer: 1, topic: "Deep Learning", difficulty: "Medium" },
    { id: "ai-015", q: "What is a 'feature vector'?", options: ["A list of model biases", "A list of numerical values representing an object", "The loss function output", "A type of kernel"], answer: 1, topic: "ML Basics", difficulty: "Easy" },
    { id: "ai-016", q: "A decision tree uses which method to split nodes?", options: ["Backpropagation", "Entropy or Gini Impurity", "Covariance", "Ridge regularization"], answer: 1, topic: "Supervised Learning", difficulty: "Hard" },
    { id: "ai-017", q: "The 'kernel' in an SVM is used for:", options: ["Reducing model size", "Mapping data to higher dimensions", "Selecting features", "Calculating accuracy"], answer: 1, topic: "Supervised Learning", difficulty: "Hard" },
    { id: "ai-018", q: "What is the 'vanishing gradient problem'?", options: ["Data normalization failure", "Gradient becoming extremely small during backpropagation", "High variance in test data", "Model diverging"], answer: 1, topic: "Deep Learning", difficulty: "Hard" },
    { id: "ai-019", q: "The activation function ReLU stands for:", options: ["Random Equal Linear Unit", "Recurrent Layer Unit", "Rectified Linear Unit", "Regulated Logic Unit"], answer: 2, topic: "Deep Learning", difficulty: "Easy" },
    { id: "ai-020", q: "Unsupervised learning aims to find:", options: ["A mapping function from inputs to labeled outputs", "Optimal weights for prediction", "Hidden patterns or intrinsic structures in input data", "Minimum error rates"], answer: 2, topic: "ML Types", difficulty: "Easy" },
  ],
  "Java": [
    { id: "java-001", q: "Which keyword is used to prevent method overriding?", options: ["static", "abstract", "final", "const"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-002", q: "Java is compiled to:", options: ["Native Machine Code", "Assembly Code", "Bytecode", "Interpreted Script"], answer: 2, topic: "Platform", difficulty: "Easy" },
    { id: "java-003", q: "What is the base class for all Java classes?", options: ["Class", "Main", "Object", "System"], answer: 2, topic: "OOP Basics", difficulty: "Medium" },
    { id: "java-004", q: "Which method is the starting point for execution?", options: ["init()", "start()", "run()", "main()"], answer: 3, topic: "Platform", difficulty: "Easy" },
    { id: "java-005", q: "Which access modifier allows access only within the same package?", options: ["public", "private", "protected", "default (package-private)"], answer: 3, topic: "Access Modifiers", difficulty: "Medium" },
    { id: "java-006", q: "What does JVM stand for?", options: ["Java Virtual Memory", "Java Vector Machine", "Just Validated Module", "Java Virtual Machine"], answer: 3, topic: "Platform", difficulty: "Easy" },
    { id: "java-007", q: "Which exception is handled at compile time?", options: ["RuntimeException", "IOException", "NullPointerException", "IndexOutOfBoundsException"], answer: 1, topic: "Exception Handling", difficulty: "Hard" },
    { id: "java-008", q: "A 'marker interface' is an interface with:", options: ["No methods or constants", "Only static methods", "Only abstract methods", "A single default method"], answer: 0, topic: "Interfaces", difficulty: "Medium" },
    { id: "java-009", q: "The keyword used to invoke the parent class constructor is:", options: ["this()", "parent()", "super()", "base()"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-010", q: "Which data structure is synchronized and thread-safe?", options: ["ArrayList", "LinkedList", "Vector", "HashMap"], answer: 2, topic: "Collections", difficulty: "Hard" },
    { id: "java-011", q: "What is the size of the boolean data type in Java?", options: ["1 byte", "2 bytes", "1 bit", "Implementation-dependent"], answer: 3, topic: "Data Types", difficulty: "Medium" },
    { id: "java-012", q: "Garbage collection in Java is primarily responsible for:", options: ["Destructing objects", "Managing memory manually", "Freeing up memory used by unreferenced objects", "Optimizing compilation"], answer: 2, topic: "Memory Management", difficulty: "Easy" },
    { id: "java-013", q: "Which statement ensures a block of code runs regardless of exceptions?", options: ["throws", "catch", "finally", "return"], answer: 2, topic: "Exception Handling", difficulty: "Easy" },
    { id: "java-014", q: "What is an abstract method?", options: ["A static method", "A method with a body", "A method without a body", "A final method"], answer: 2, topic: "OOP", difficulty: "Medium" },
    { id: "java-015", q: "How does Java achieve platform independence?", options: ["By using a specialized compiler", "By compiling to Bytecode", "By implementing native OS calls", "By running directly on hardware"], answer: 1, topic: "Platform", difficulty: "Medium" },
  ],
  "SQL": [
    { id: "sql-001", q: "Which command is used to retrieve data from a database?", options: ["EXTRACT", "OPEN", "GET", "SELECT"], answer: 3, topic: "DQL", difficulty: "Easy" },
    { id: "sql-002", q: "Which keyword removes all rows from a table, retaining structure?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], answer: 3, topic: "DDL/DML", difficulty: "Medium" },
    { id: "sql-003", q: "What is a primary key?", options: ["A foreign key", "A column that uniquely identifies a row", "A descriptive index", "A composite key"], answer: 1, topic: "Database Design", difficulty: "Easy" },
    { id: "sql-004", q: "Which type of join returns only matching rows from both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"], answer: 3, topic: "Joins", difficulty: "Medium" },
    { id: "sql-005", q: "Which clause is used to filter records after aggregation?", options: ["WHERE", "GROUP BY", "ORDER BY", "HAVING"], answer: 3, topic: "Advanced Queries", difficulty: "Hard" },
    { id: "sql-006", q: "What does DDL stand for?", options: ["Data Definition Language", "Data Duplication Language", "Database Design Logic", "Data Query Language"], answer: 0, topic: "Concepts", difficulty: "Easy" },
    { id: "sql-007", q: "Which command modifies the definition of a table?", options: ["UPDATE", "MODIFY TABLE", "ALTER TABLE", "CHANGE TABLE"], answer: 2, topic: "DDL", difficulty: "Easy" },
    { id: "sql-008", q: "What is a Foreign Key?", options: ["A key used for encryption", "A key that links two tables", "The primary key of the current table", "A unique index"], answer: 1, topic: "Database Design", difficulty: "Medium" },
    { id: "sql-009", q: "Which function calculates the average of values?", options: ["SUM", "COUNT", "AVG", "MEAN"], answer: 2, topic: "Aggregate Functions", difficulty: "Easy" },
    { id: "sql-010", q: "The command used to permanently save changes made to a database:", options: ["SAVE", "COMMIT", "ROLLBACK", "TRANSACTION"], answer: 1, topic: "TCL", difficulty: "Medium" },
    { id: "sql-011", q: "A database index is primarily used to:", options: ["Encrypt data", "Speed up data retrieval", "Reduce table size", "Enforce data types"], answer: 1, topic: "Database Design", difficulty: "Medium" },
    { id: "sql-012", q: "Which constraint ensures all values in a column are different?", options: ["NOT NULL", "CHECK", "UNIQUE", "DEFAULT"], answer: 2, topic: "Constraints", difficulty: "Easy" },
    { id: "sql-013", q: "Which join returns all rows from the left table and matched rows from the right?", options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL JOIN"], answer: 2, topic: "Joins", difficulty: "Medium" },
    { id: "sql-014", q: "The command used to grant a user permission to access a database object is:", options: ["ALLOW", "SET", "GRANT", "PERMIT"], answer: 2, topic: "DCL", difficulty: "Hard" },
    { id: "sql-015", q: "What is a 'View' in SQL?", options: ["A physical table stored on disk", "A virtual table based on the result-set of an SQL statement", "A stored procedure", "A database schema"], answer: 1, topic: "Database Concepts", difficulty: "Medium" },
  ],
  "MongoDB": [
    { id: "mongo-001", q: "MongoDB stores data as:", options: ["JSON documents", "Tables", "XML files", "Key-value pairs"], answer: 0, topic: "Basics", difficulty: "Easy" },
    { id: "mongo-002", q: "The equivalent of a 'Table' in MongoDB is a:", options: ["Database", "Collection", "Document", "Index"], answer: 1, topic: "Concepts", difficulty: "Medium" },
    { id: "mongo-003", q: "Which method is used for updating documents?", options: ["db.collection.modify()", "db.collection.update()", "db.collection.edit()", "db.collection.replace()"], answer: 1, topic: "CRUD", difficulty: "Medium" },
    { id: "mongo-004", q: "Which field is automatically added to every document as the primary key?", options: ["_id", "primaryKey", "docId", "key"], answer: 0, topic: "Basics", difficulty: "Easy" },
    { id: "mongo-005", q: "What is the primary way to perform complex data manipulation?", options: ["Aggregation Pipeline", "Find/Limit commands", "Manual JS loops", "SQL Queries"], answer: 0, topic: "Advanced Queries", difficulty: "Hard" },
    { id: "mongo-006", q: "MongoDB is an example of what type of database?", options: ["Relational", "Graph", "Document-Oriented (NoSQL)", "Key-Value"], answer: 2, topic: "Concepts", difficulty: "Easy" },
    { id: "mongo-007", q: "Which command inserts a single document?", options: ["db.col.addOne()", "db.col.insertSingle()", "db.col.insertOne()", "db.col.create()"], answer: 2, topic: "CRUD", difficulty: "Easy" },
    { id: "mongo-008", q: "What property allows a field to contain an array of sub-documents?", options: ["Embedded Array", "Array Field", "Nested Document", "List Schema"], answer: 0, topic: "Schema Design", difficulty: "Medium" },
    { id: "mongo-009", q: "Which method removes all documents matching a filter?", options: ["db.col.deleteMany()", "db.col.removeAll()", "db.col.removeMany()", "db.col.deleteBulk()"], answer: 0, topic: "CRUD", difficulty: "Medium" },
    { id: "mongo-010", q: "Sharding in MongoDB is used for:", options: ["Data encryption", "Vertical scaling", "Horizontal scaling", "Data backup"], answer: 2, topic: "Architecture", difficulty: "Hard" },
    { id: "mongo-011", q: "What is the default isolation level in MongoDB transactions?", options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Snapshot"], answer: 1, topic: "Transactions", difficulty: "Hard" },
    { id: "mongo-012", q: "Which aggregation stage performs filtering?", options: ["$group", "$project", "$match", "$sort"], answer: 2, topic: "Aggregation", difficulty: "Medium" },
    { id: "mongo-013", q: "The write concern 'majority' ensures data is written to:", options: ["The primary node only", "All nodes", "A majority of voting members", "Only secondary nodes"], answer: 2, topic: "Architecture", difficulty: "Hard" },
    { id: "mongo-014", q: "How do you define a one-to-many relationship in MongoDB?", options: ["Joins", "Reference embedding", "Primary/Foreign Keys", "Schema normalization"], answer: 1, topic: "Schema Design", difficulty: "Medium" },
    { id: "mongo-015", q: "GridFS is primarily used for storing:", options: ["Small strings", "User data", "Binary large objects (BLOBs)", "Indexes"], answer: 2, topic: "Storage", difficulty: "Medium" },
  ],
  "PHP": [
    { id: "php-001", q: "PHP statements must end with a:", options: ["Dot", "Comma", "Semicolon", "Colon"], answer: 2, topic: "Syntax", difficulty: "Easy" },
    { id: "php-002", q: "Which symbol starts a variable name?", options: ["$", "@", "#", "&"], answer: 0, topic: "Variables", difficulty: "Easy" },
    { id: "php-003", q: "Which function includes content from another file?", options: ["require()", "include()", "import()", "Both 1 and 2"], answer: 3, topic: "Includes", difficulty: "Medium" },
    { id: "php-004", q: "What is used for outputting text in PHP?", options: ["print", "echo", "write", "Both 1 and 2"], answer: 3, topic: "I/O", difficulty: "Easy" },
    { id: "php-005", q: "Which function is used to start a session?", options: ["start_session()", "session_begin()", "session_start()", "new_session()"], answer: 2, topic: "Web Concepts", difficulty: "Medium" },
    { id: "php-006", q: "Which array type uses named keys?", options: ["Indexed", "Associative", "Multidimensional", "Sequential"], answer: 1, topic: "Data Types", difficulty: "Easy" },
    { id: "php-007", q: "The operator `===` checks for:", options: ["Equality only", "Assignment", "Equality and type", "Inequality"], answer: 2, topic: "Operators", difficulty: "Medium" },
    { id: "php-008", q: "Which superglobal holds information about headers, paths, and script locations?", options: ["$_SESSION", "$_GET", "$_POST", "$_SERVER"], answer: 3, topic: "Superglobals", difficulty: "Medium" },
    { id: "php-009", q: "How do you define a constant?", options: ["const MY_CONST = 1;", "define('MY_CONST', 1);", "constant MY_CONST = 1;", "Both 1 and 2"], answer: 3, topic: "Constants", difficulty: "Easy" },
    { id: "php-010", q: "The term used for defining a required base structure for a class is:", options: ["Trait", "Interface", "Abstract Class", "Extension"], answer: 1, topic: "OOP", difficulty: "Hard" },
    { id: "php-011", q: "What does the `->` operator refer to?", options: ["Static class member", "Object property/method", "Pointer reference", "Array index"], answer: 1, topic: "OOP", difficulty: "Medium" },
    { id: "php-012", q: "Which loop is designed for iterating over array elements?", options: ["for", "while", "do-while", "foreach"], answer: 3, topic: "Control Flow", difficulty: "Easy" },
    { id: "php-013", q: "Which is the most secure way to interact with a database?", options: ["Direct SQL concatenation", "Using prepared statements", "URL parameters", "Global variables"], answer: 1, topic: "Security", difficulty: "Hard" },
    { id: "php-014", q: "What function is used to validate an email address format?", options: ["is_email()", "validate_email()", "filter_var()", "check_mail()"], answer: 2, topic: "Functions", difficulty: "Medium" },
    { id: "php-015", q: "Which version of PHP introduced strict typing and better OOP features?", options: ["PHP 4", "PHP 5", "PHP 7", "PHP 8"], answer: 2, topic: "History", difficulty: "Hard" },
  ],
  "Go": [
    { id: "go-001", q: "Go routines are:", options: ["OS Threads", "Heavyweight Processes", "Lightweight Threads", "Functions"], answer: 2, topic: "Concurrency", difficulty: "Hard" },
    { id: "go-002", q: "The keyword to define a function is:", options: ["define", "function", "func", "fn"], answer: 2, topic: "Syntax", difficulty: "Easy" },
    { id: "go-003", q: "What is Go's tool for code formatting?", options: ["go vet", "go format", "gofmt", "go tidy"], answer: 2, topic: "Tooling", difficulty: "Medium" },
    { id: "go-004", q: "The default value of an uninitialized string in Go is:", options: ["null", "'' (empty string)", "undefined", "zero"], answer: 1, topic: "Data Types", difficulty: "Easy" },
    { id: "go-005", q: "Which statement is used for concurrency communication?", options: ["goroutine", "thread", "channel", "sync"], answer: 2, topic: "Concurrency", difficulty: "Medium" },
    { id: "go-006", q: "Go achieves polymorphism through:", options: ["Class inheritance", "Method overloading", "Interfaces", "Generics"], answer: 2, topic: "OOP Concepts", difficulty: "Hard" },
    { id: "go-007", q: "What is the package name for the main executable?", options: ["pkg", "main", "core", "start"], answer: 1, topic: "Syntax", difficulty: "Easy" },
    { id: "go-008", q: "The assignment operator used for short variable declaration is:", options: ["=", ":=", "=>", "=="], answer: 1, topic: "Operators", difficulty: "Easy" },
    { id: "go-009", q: "What is the purpose of the `defer` statement?", options: ["To pause execution", "To run a function after the surrounding function returns", "To define a recursive function", "To handle exceptions"], answer: 1, topic: "Control Flow", difficulty: "Medium" },
    { id: "go-010", q: "Which keyword is used to start a new concurrent process?", options: ["newThread", "parallel", "goroutine", "go"], answer: 3, topic: "Concurrency", difficulty: "Medium" },
    { id: "go-011", q: "What is a 'Slice' in Go?", options: ["A fixed-size array", "A dynamic array wrapper around an array", "A pointer to an array", "A type of map"], answer: 1, topic: "Data Structures", difficulty: "Medium" },
    { id: "go-012", q: "Go's error handling philosophy relies heavily on:", options: ["Try-catch blocks", "Exceptions", "Returning error values", "Global error flags"], answer: 2, topic: "Error Handling", difficulty: "Hard" },
    { id: "go-013", q: "The primary tool used to build Go programs is:", options: ["go run", "go build", "go install", "All of the above"], answer: 3, topic: "Tooling", difficulty: "Easy" },
    { id: "go-014", q: "What is the zero value of an integer (`int`)?", options: ["1", "null", "0", "nil"], answer: 2, topic: "Data Types", difficulty: "Easy" },
    { id: "go-015", q: "What are 'Structs' in Go?", options: ["Built-in complex data types", "User-defined composite types", "Functions that operate on interfaces", "A concurrency primitive"], answer: 1, topic: "Data Structures", difficulty: "Medium" },
  ],
};


// --- Helper Functions (No change) ---
function generateVerificationHash(name: string, role: string, score: number, id: string): string {
    const uniqueData = `${name}-${role}-${score}-${id}`;
    return btoa(uniqueData).replace(/=/g, '').substring(0, 16);
}

function gradeFromScore(scorePercent: number) {
  if (scorePercent >= 90) return "A";
  if (scorePercent >= 75) return "B";
  if (scorePercent >= 60) return "C";
  if (scorePercent >= 40) return "D";
  return "F";
}

function badgeFromScore(scorePercent: number) {
  if (scorePercent >= 90) return { name: "Mastery", color: "background-color: #f59e0b;" }; // bg-amber-400
  if (scorePercent >= 75) return { name: "Advanced", color: "background-color: #4ade80;" }; // bg-green-400
  if (scorePercent >= 60) return { name: "Proficient", color: "background-color: #60a5fa;" }; // bg-blue-400
  if (scorePercent >= 40) return { name: "Beginner", color: "background-color: #818cf8;" }; // bg-indigo-400
  return { name: "Participant", color: "background-color: #d1d5db;" }; // bg-gray-300
}

function generateDisplayName(fullName: string | null, isAnonymous: boolean): string {
    if (isAnonymous || !fullName || fullName.trim() === "") {
        return "Anonymous Learner";
    }
    const parts = fullName.trim().split(/\s+/);
    if (parts.length > 1) {
        return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
    }
    return parts[0] || "User";
}

const getSimulatedLeaderboard = (newEntry?: LeaderboardEntry): LeaderboardEntry[] => {
    const initialData: LeaderboardEntry[] = [
        { name: "Alex Z.", displayName: "Alex Z.", role: "Web Development", score: 18, time: 240, badge: "Mastery" },
        { name: "Ben S.", displayName: "Ben S.", role: "Web Development", score: 15, time: 280, badge: "Advanced" },
        { name: "Chris D.", displayName: "Chris D.", role: "AI/ML", score: 14, time: 300, badge: "Advanced" },
    ];
    if (newEntry) { initialData.push(newEntry); }
    return initialData.sort((a, b) => b.score - a.score || a.time - b.time).slice(0, 5).map(entry => ({ ...entry, name: entry.displayName }));
};

const updateStreak = (currentStreak: number): number => {
    return currentStreak + 1;
};

// --- Navbar Component (Inline CSS) ---
function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50, backgroundImage: 'linear-gradient(to right, rgb(29, 78, 216), rgb(30, 64, 175))', color: 'white', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', textShadow: '0 0 8px rgba(255,255,255,0.7)' }}>
          <span style={{ color: 'rgb(147, 197, 253)' }}>V</span><span style={{ color: 'white' }}>erteX</span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '300', opacity: 0.8, marginTop: '4px' }}>Explore.Learn.Achieve</span>
      </div>
      <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: '500' }}>
        <Link href="#home" style={{ borderBottom: '2px solid white', fontWeight: '600', textDecoration: 'none', color: 'inherit' }}>Home</Link>
        <Link href="#quiz" style={{ textDecoration: 'none', color: 'inherit' }}>Assessments</Link>
        <Link href="/roadmaps" style={{ textDecoration: 'none', color: 'inherit' }}>Roadmaps</Link>
        <Link href="/certifications" style={{ textDecoration: 'none', color: 'inherit' }}>Certifications</Link>
      </div>
    </nav>
  );
}

// --- Main Application Component ---
export default function QuizPage() {
    // --- State & Hydration Fix ---
    const [isMounted, setIsMounted] = useState(false); 

    const [view, setView] = useState<"landing" | "quiz">("landing");
    const [quizStep, setQuizStep] = useState<"form" | "quiz" | "result" | "revision">("form"); 

    const [name, setName] = useState("");
    const [role, setRole] = useState<string>("");
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [time, setTime] = useState(0); 
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAttemptId, setQuizAttemptId] = useState<string>("");
    
    // Unused state removed for cleaner code
    const [codeSubmission, setCodeSubmission] = useState<string>(""); 
    const [codePassed, setCodePassed] = useState<boolean | null>(null);
    
    // Privacy/Pro State
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [hasConsented, setHasConsented] = useState(false); 
    const [userData, setUserData] = useState<any>(() => ({ streak: 0, badges: [], level: "Beginner" }));
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => getSimulatedLeaderboard());
    
    // --- Memoized/Derived State ---
    const availableRoles = useMemo(() => Object.keys(QUIZ_DATA), []); // Dynamically pulls all new subjects
    const allQuestionsForRole = useMemo(() => QUIZ_DATA[role] || [], [role]);
    const questions = useMemo(() => allQuestionsForRole, [allQuestionsForRole]); // Use all available questions
    
    const displayName = useMemo(() => generateDisplayName(name, isAnonymous), [name, isAnonymous]);
    const isCertificateAllowed = useMemo(() => !isAnonymous && name.trim().length > 0, [isAnonymous, name]);
    
    // Score calculation (Max score is now the total number of questions for that role)
    const maxScore = questions.length;
    const finalScorePercent = score !== null && maxScore > 0 ? Math.round((Number(score) / maxScore) * 100) : null;
    const grade = finalScorePercent !== null ? gradeFromScore(finalScorePercent) : null;
    const badge = finalScorePercent !== null ? badgeFromScore(finalScorePercent) : null;
    const incorrectQuestions = useMemo(() => questions.filter((_, idx) => answers[idx] !== questions[idx].answer), [questions, answers]);
    const verificationHash = useMemo(() => quizAttemptId && score !== null ? generateVerificationHash(name, role, score, quizAttemptId) : '', [name, role, score, quizAttemptId]);

    // --- Effects & Handlers (Trimmed for brevity) ---
    
    // HYDRATION FIX: Set isMounted to true on client load.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (quizStep === 'quiz') {
            const overallTimer = setInterval(() => setTime(t => t + 1), 1000);
            return () => clearInterval(overallTimer);
        }
    }, [quizStep]);

    const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
        const copyAnswers = [...answers];
        copyAnswers[qIndex] = optionIndex;
        setAnswers(copyAnswers);
        if (qIndex < questions.length - 1) { setCurrentQuestionIndex(qIndex + 1); setQuestionStartTime(Date.now()); }
    };
    
    const submitQuiz = () => {
        const correctMCQs = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].answer ? 1 : 0), 0);
        const finalScore = correctMCQs;
        
        setScore(finalScore);
        
        if (!isAnonymous && finalScorePercent !== null) {
            const currentBadge = badgeFromScore(finalScorePercent).name;
            const newUserData = { streak: updateStreak(userData.streak), badges: [...new Set([...userData.badges, currentBadge])], level: (finalScorePercent >= 90) ? 'Master' : (finalScorePercent >= 75) ? 'Expert' : (finalScorePercent >= 60) ? 'Intermediate' : 'Beginner' };
            setUserData(newUserData);
            const newLeaderboardEntry: LeaderboardEntry = { name: name, displayName: displayName, role, score: finalScore, time, badge: currentBadge };
            setLeaderboard(getSimulatedLeaderboard(newLeaderboardEntry));
        }
        setQuizStep("result");
    };

    const downloadCertificate = useCallback(async () => {
        if (!isCertificateAllowed || score === null || score === undefined) { 
            alert("Certificates are only available in verified mode with a completed assessment."); 
            return; 
        }
        setIsGenerating(true);
        
        const verifHash = generateVerificationHash(name, role, score, quizAttemptId);
        const verificationUrl = `https://vertex.com/verify?id=${quizAttemptId}&hash=${verifHash}`;
        
        const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
        const img = new Image();
        img.src = "/certificate-template.png"; 

        img.onload = async () => {
            try {
                doc.addImage(img, "PNG", 0, 0, 842, 595); // Add the background image

                doc.setFont("Helvetica", "Bold");
                doc.setFontSize(36);
                doc.setTextColor(25, 63, 235);
                doc.text(name, 421, 280, { align: "center" }); 

                doc.setFont("Helvetica", "Normal");
                doc.setFontSize(14);
                doc.setTextColor(70, 70, 70);
                doc.text(`For successfully completing the "${role}" Professional Assessment`, 421, 320, { align: "center" });
                doc.text(`Final Score: ${score} / ${maxScore} | Grade: ${grade} | Verification Hash: ${verifHash}`, 421, 360, { align: "center" });
                
                // Add QR Code (simulated fetch)
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(verificationUrl)}`;
                const qrResponse = await fetch(qrApiUrl);
                const qrBlob = await qrResponse.blob();
                const qrReader = new FileReader();
                
                qrReader.onloadend = () => {
                    doc.addImage(qrReader.result as string, "PNG", 700, 450, 90, 90); 
                    // Saves the PDF to the user's computer
                    doc.save(`VerteX_Certification_${quizAttemptId}.pdf`); 
                    setIsGenerating(false);
                };
                qrReader.readAsDataURL(qrBlob);

            } catch (error) {
                console.error("PDF Generation Error:", error);
                alert("Failed to generate PDF or fetch QR code. Check console for details.");
                setIsGenerating(false);
            }
        };
        img.onerror = () => { 
            alert("Certificate template not found. Ensure '/certificate-template.png' is in your public folder."); 
            setIsGenerating(false); 
        };

    }, [name, role, score, maxScore, quizAttemptId, finalScorePercent, grade, isCertificateAllowed, verificationHash]);


    // --- Sub Components ---

    const StudyPlatformLanding = () => {
        const studyModes = [
            { icon: FiBookOpen, title: "Flashcards", desc: "Adaptive card system for instant recall.", color: { backgroundColor: 'rgb(220, 252, 231)', color: 'rgb(42, 120, 77)' }, action: "Start Learning" }, 
            { icon: FiEdit, title: "Practice Tests", desc: "Simulated MCQs based on topic and difficulty.", color: { backgroundColor: 'rgb(219, 234, 254)', color: 'rgb(37, 99, 235)' }, action: "Try Quiz Mode" }, 
            { icon: FiCode, title: "Code Challenges", desc: "HackerRank-style problems for hands-on validation.", color: { backgroundColor: 'rgb(253, 242, 248)', color: 'rgb(219, 39, 119)' }, action: "View Challenges" }, 
            { icon: FiMessageSquare, title: "AI Study Chat", desc: "Get instant explanations and deep dive with our bot.", color: { backgroundColor: 'rgb(237, 233, 254)', color: 'rgb(109, 40, 217)' }, action: "Ask A Question" }, 
        ];
    
        return (
            <div style={{ paddingTop: '96px', minHeight: '100vh', backgroundColor: 'white' }}>
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: '48px', padding: '64px 0' }}>
                        <div>
                            <h1 style={{ fontSize: '60px', fontWeight: '800', color: 'rgb(17, 24, 39)', lineHeight: '1.2' }}>
                                Master your skills with <span style={{ color: 'rgb(29, 78, 216)' }}>AI-Powered</span> learning.
                            </h1>
                            <p style={{ marginTop: '16px', fontSize: '20px', color: 'rgb(75, 85, 99)' }}>
                                Join the community building expertise with interactive study modes, verified assessments, and personalized roadmaps.
                            </p>
                            <button
                                onClick={() => setView("quiz")}
                                style={{ marginTop: '32px', padding: '16px 40px', fontSize: '18px', fontWeight: '700', borderRadius: '12px', backgroundColor: 'rgb(37, 99, 235)', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                            >
                                Start Assessment Now
                            </button>
                        </div>
    
                        <div style={{ position: 'relative', height: '384px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '16px' }}>
                            {studyModes.map((mode, index) => (
                                <div 
                                    key={mode.title} 
                                    style={{ 
                                        padding: '20px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgb(243, 244, 246)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s', transform: index === 0 ? 'translateY(-20px)' : index === 3 ? 'translateY(20px)' : 'none', zIndex: index === 1 ? 10 : 5, 
                                        ...mode.color 
                                    }}
                                >
                                    <mode.icon size={30} style={{ color: mode.color.color }} />
                                    <div style={{ marginTop: '8px' }}>
                                        <h4 style={{ fontWeight: '700', fontSize: '18px', color: 'rgb(31, 41, 55)' }}>{mode.title}</h4>
                                        <p style={{ fontSize: '14px', color: 'rgb(75, 85, 99)', marginTop: '4px' }}>{mode.desc}</p>
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: '600', marginTop: '12px', color: mode.color.color }}>{mode.action} &rarr;</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const LeaderboardPanel = () => (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(31, 41, 55)', display: 'flex', alignItems: 'center', gap: '8px' }}><MdLeaderboard style={{ color: 'rgb(59, 130, 246)' }} /> Global Leaderboard</h3>
            <p style={{ fontSize: '14px', color: 'rgb(107, 114, 128)', display: 'flex', alignItems: 'center', gap: '4px' }}><FiLock style={{ color: 'rgb(239, 68, 68)' }} /> Names are anonymized for public view.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {leaderboard.map((entry, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid rgb(243, 244, 246)', transition: 'all 0.2s', borderRadius: '6px', backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: '24px', height: '24px', borderRadius: '9999px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: index === 0 ? 'white' : index === 1 ? 'rgb(31, 41, 55)' : index === 2 ? 'white' : 'rgb(59, 130, 246)', backgroundColor: index === 0 ? 'rgb(245, 158, 11)' : index === 1 ? 'rgb(209, 213, 219)' : index === 2 ? 'rgb(202, 138, 4)' : 'rgb(219, 234, 254)' }}>{index + 1}</span>
                            <div style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <p style={{ fontWeight: '600', color: 'rgb(31, 41, 55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.displayName}</p>
                                <p style={{ fontSize: '12px', color: 'rgb(107, 114, 128)' }}>{entry.role}</p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <p style={{ fontWeight: '700', fontSize: '18px', color: 'rgb(22, 163, 74)' }}>{entry.score}/{maxScore}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    const AchievementsPanel = () => (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(31, 41, 55)', display: 'flex', alignItems: 'center', gap: '8px' }}><MdStar style={{ color: 'rgb(109, 40, 217)' }} /> My Profile & Progress</h3>
            
            {isAnonymous ? (
                <p style={{ color: 'rgb(239, 68, 68)', fontWeight: '500', padding: '12px', backgroundColor: 'rgb(254, 226, 226)', border: '1px solid rgb(252, 165, 165)', borderRadius: '8px' }}>Achievements and streaks are disabled in **Anonymous Mode**.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div style={{ backgroundColor: 'rgb(253, 242, 248)', borderLeft: '4px solid rgb(236, 72, 153)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FiZap size={24} style={{ color: 'rgb(236, 72, 153)', flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: '500', color: 'rgb(107, 114, 128)' }}>Daily Streak</p>
                            <p style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(219, 39, 119)' }}>{userData.streak} Days</p>
                        </div>
                    </div>
                    <div style={{ backgroundColor: 'rgb(254, 243, 199)', borderLeft: '4px solid rgb(251, 191, 36)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FiAward size={24} style={{ color: 'rgb(202, 138, 4)', flexShrink: 0 }} />
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: '500', color: 'rgb(107, 114, 128)' }}>Current Level</p>
                            <p style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(202, 138, 4)' }}>{userData.level}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const RevisionMode = () => (
        <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid rgb(209, 213, 219)', backgroundColor: 'rgb(255, 245, 245)', color: 'rgb(239, 68, 68)', textAlign: 'center' }}>
            <FiRefreshCw size={30} style={{ marginBottom: '10px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Revision Mode</h3>
            <p>Reviewing your {incorrectQuestions.length} mistakes. Content here.</p>
        </div>
    );


    // RENDER: HYDRATION FIX FALLBACK
    if (!isMounted) {
        return (
            <div style={{ paddingTop: '96px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <p style={{ fontSize: '18px', color: 'rgb(107, 114, 128)' }}>Loading professional platform...</p>
            </div>
        );
    }


    // RENDER: MAIN APPLICATION STRUCTURE
    return (
        <div style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(to bottom right, rgb(239, 246, 255), rgb(237, 242, 255))', minWidth: '100%' }}>
            <Navbar />

            {/* View Switching */}
            {view === "landing" && <StudyPlatformLanding />}

            {view === "quiz" && (
                <div id="quiz" style={{ display: 'flex', justifyContent: 'center', padding: '24px', paddingTop: '96px' }}>
                    <div style={{ width: '100%', maxWidth: '1280px', display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>

                            {/* LEFT COLUMN: Main Content */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Header */}
                                <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <MdOutlineQuiz size={36} style={{ color: 'rgb(37, 99, 235)' }} />
                                    <div>
                                        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'rgb(31, 41, 55)' }}>VerteX Assessment Center</h1>
                                        <p style={{ fontSize: '14px', color: 'rgb(107, 114, 128)' }}>Securely validate your skills and obtain a verified certification.</p>
                                    </div>
                                </div>

                                {/* Main Interactive Card */}
                                <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
                                    
                                    {quizStep === "form" && (
                                        <>
                                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(31, 41, 55)', marginBottom: '16px' }}>Candidate Registration</h2>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                <input style={{ padding: '12px', border: '1px solid rgb(209, 213, 219)', borderRadius: '8px', fontSize: '16px', color: 'rgb(31, 41, 55)' }} placeholder="Your Full Name (Required for Verified Certificate)" value={name} onChange={(e) => setName(e.target.value)} disabled={isAnonymous}/>
                                                <select style={{ padding: '12px', border: '1px solid rgb(209, 213, 219)', borderRadius: '8px', fontSize: '16px', color: 'rgb(31, 41, 55)' }} value={role} onChange={(e) => setRole(e.target.value)}>
                                                    <option value="" disabled style={{color: 'rgb(107, 114, 128)'}}>Select a Certification Track</option>
                                                    {availableRoles.map((r) => (<option key={r} value={r}>{r}</option>))}
                                                </select>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <input type="checkbox" checked={isAnonymous} onChange={(e) => { setIsAnonymous(e.target.checked); if (e.target.checked) setName(""); }} style={{ width: '16px', height: '16px' }}/>
                                                    <label style={{ fontSize: '14px', color: 'rgb(55, 65, 81)' }}>Run in **Anonymous Mode** (No Certificate, No Profile)</label>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                                                    <input type="checkbox" checked={hasConsented} onChange={(e) => setHasConsented(e.target.checked)} style={{ width: '16px', height: '16px', marginTop: '4px' }}/>
                                                    <label style={{ fontSize: '12px', color: 'rgb(107, 114, 128)' }}>I agree to the <span style={{ fontWeight: '600', color: 'rgb(37, 99, 235)' }}>VerteX Terms and Privacy Policy</span>.</label>
                                                </div>

                                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                                    <button onClick={() => {
                                                        if (!role || !hasConsented) { alert("Please complete required fields."); return; }
                                                        if (!isAnonymous && !name) { alert("Please enter your name or select Anonymous Mode."); return; }
                                                        setQuizStep("quiz"); setQuizAttemptId(`VTX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
                                                    }} style={{ flex: 1, padding: '12px 24px', borderRadius: '8px', backgroundColor: 'rgb(37, 99, 235)', color: 'white', border: 'none', cursor: 'pointer', opacity: (!role || !hasConsented) ? 0.5 : 1 }}>Start Assessment</button>
                                                    <button onClick={() => setView("landing")} style={{ flex: 1, padding: '12px 24px', borderRadius: '8px', border: '1px solid rgb(209, 213, 219)', backgroundColor: 'white', cursor: 'pointer', color: 'rgb(75, 85, 99)' }}>Go Back Home</button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {quizStep === "quiz" && (
                                        <>
                                            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'rgb(31, 41, 55)', marginBottom: '8px' }}>MCQ Assessment: {role}</h2>
                                            <p style={{ fontSize: '14px', color: 'rgb(107, 114, 128)', marginBottom: '16px' }}>Candidate: **{displayName}** | Time: {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
                                            
                                            {/* Question Display Logic - FIXED */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                                {questions.map((qq, qi) => {
                                                    if (qi !== currentQuestionIndex) return null;

                                                    const currentQuestion = questions[currentQuestionIndex];
                                                    const selectedAnswer = answers[currentQuestionIndex];

                                                    return (
                                                        <div 
                                                            key={currentQuestion.id} 
                                                            style={{ padding: '16px', border: '1px solid rgb(191, 219, 254)', borderRadius: '8px', backgroundColor: 'rgb(239, 246, 255)', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                                <p style={{ fontWeight: '600', fontSize: '18px', color: 'rgb(31, 41, 55)' }}>{currentQuestionIndex + 1}. {currentQuestion.q}</p>
                                                                <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: currentQuestion.difficulty === 'Easy' ? 'rgb(220, 252, 231)' : currentQuestion.difficulty === 'Medium' ? 'rgb(254, 243, 199)' : 'rgb(254, 202, 202)', color: currentQuestion.difficulty === 'Easy' ? 'rgb(22, 163, 74)' : currentQuestion.difficulty === 'Medium' ? 'rgb(202, 138, 4)' : 'rgb(220, 38, 38)' }}>
                                                                    {currentQuestion.difficulty}
                                                                </span>
                                                            </div>
                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '16px' }}>
                                                                {currentQuestion.options.map((opt, oi) => {
                                                                    const isSelected = selectedAnswer === oi;
                                                                    return (
                                                                        <button
                                                                            key={oi}
                                                                            onClick={() => handleSelectAnswer(currentQuestionIndex, oi)}
                                                                            style={{ textAlign: 'left', padding: '8px 16px', borderRadius: '8px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', 
                                                                                backgroundColor: isSelected ? 'rgb(37, 99, 235)' : 'rgb(243, 244, 246)', 
                                                                                color: isSelected ? 'white' : 'rgb(31, 41, 55)', 
                                                                                borderColor: isSelected ? 'rgb(29, 78, 216)' : 'rgb(229, 231, 235)',
                                                                                boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                                                                            }}
                                                                        >
                                                                            {opt}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                                <button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid rgb(209, 213, 219)', backgroundColor: 'white', cursor: 'pointer', opacity: currentQuestionIndex === 0 ? 0.5 : 1, color: 'rgb(75, 85, 99)' }}>Previous</button>
                                                {currentQuestionIndex < questions.length - 1 ? (
                                                    <button onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))} disabled={answers[currentQuestionIndex] === -1} style={{ marginLeft: 'auto', padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgb(59, 130, 246)', color: 'white', border: 'none', cursor: 'pointer', opacity: answers[currentQuestionIndex] === -1 ? 0.5 : 1 }}>Next Question</button>
                                                ) : (
                                                    <button onClick={submitQuiz} disabled={answers.includes(-1)} style={{ marginLeft: 'auto', padding: '10px 20px', borderRadius: '8px', backgroundColor: 'rgb(22, 163, 74)', color: 'white', border: 'none', cursor: 'pointer', opacity: answers.includes(-1) ? 0.5 : 1 }}>
                                                        Submit Final Assessment
                                                    </button>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {quizStep === "result" && (
                                        <>
                                            <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'rgb(31, 41, 55)', marginBottom: '16px' }}>Assessment Results</h2>
                                            <p style={{ color: 'rgb(107, 114, 128)' }}>Congratulations, **{displayName}**! Your final verified score is {score}/{maxScore} ({finalScorePercent}%).</p>
                                            
                                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                                <button onClick={() => setView("landing")} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid rgb(209, 213, 219)', backgroundColor: 'white', cursor: 'pointer', color: 'rgb(75, 85, 99)' }}>Go Back Home</button>
                                                
                                                {/* CERTIFICATE DOWNLOAD BUTTON - RE-INTEGRATED */}
                                                {isCertificateAllowed ? (
                                                    <button onClick={downloadCertificate} style={{ padding: '12px 24px', borderRadius: '8px', backgroundColor: 'rgb(37, 99, 235)', color: 'white', border: 'none', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }} disabled={isGenerating}>
                                                        <MdDownload /> {isGenerating ? "Generating..." : "Download Verified Credential"}
                                                    </button>
                                                ) : (
                                                    <div style={{ padding: '12px 24px', borderRadius: '8px', backgroundColor: 'rgb(254, 226, 226)', color: 'rgb(239, 68, 68)', border: '1px solid rgb(252, 165, 165)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600' }}>
                                                        <FiLock /> Certificate Disabled (Anonymous)
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    {quizStep === "revision" && <RevisionMode />}
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Side Panels */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Certificate Preview (Adjusted visibility) */}
                                {quizStep !== "form" && quizStep !== "revision" && (
                                    <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '16px 24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(31, 41, 55)', marginBottom: '12px' }}>Verified Credential Preview</h3>
                                        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgb(229, 231, 235)' }}>
                                            <img src="/certificate-template.png" alt="Certificate Preview" style={{ width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '8px' }}/>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Achievements and Leaderboard */}
                                {quizStep !== "form" && (
                                    <>
                                        <AchievementsPanel />
                                        <LeaderboardPanel />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}