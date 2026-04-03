sequenceDiagram
    participant browser
    participant server
    Note right of browser: The browser renders the list from the info it got from the input locally
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server appends the new note to the list

    server-->>browser: {"message":"note created"}
    deactivate server
    
 
    
