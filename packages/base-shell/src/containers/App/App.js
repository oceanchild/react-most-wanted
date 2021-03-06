import A2HSProvider from 'a2hs'
import ConfigProvider from '../../providers/Config/Provider'
import OnlineProvider from '../../providers/Online/Provider'
import React, { Suspense, lazy } from 'react'
import UpdateProvider from '../../providers/Update/Provider'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components, containers, update } = config
  const { LandingPage = false } = pages || {}
  const { checkInterval = 5000 } = update || {}
  const { Loading } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <Suspense fallback={<Loading />}>
      <AppContainer>
        <Router>
          <ConfigProvider appConfig={config}>
            <UpdateProvider checkInterval={checkInterval}>
              <OnlineProvider>
                <A2HSProvider>
                  <Switch>
                    {LandingPage && (
                      <Route path="/" exact component={LandingPage} />
                    )}
                    <Route component={Layout} />
                  </Switch>
                </A2HSProvider>
              </OnlineProvider>
            </UpdateProvider>
          </ConfigProvider>
        </Router>
      </AppContainer>
    </Suspense>
  )
}

export default App
