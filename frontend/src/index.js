import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { FluentProvider, teamsLightTheme, webDarkTheme, webLightTheme } from "@fluentui/react-components"
import { mergeStyles } from "@fluentui/react"

import { App } from "./App"
import { AuthProvider } from "./context/AuthProvider"



ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root"),
)



