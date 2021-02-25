import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'
import PublishLayout from '../layouts/Publish'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PublishLayout>
          Hello world!
        </PublishLayout>
      </ThemeProvider>
    </div>
  );
}

export default App;
