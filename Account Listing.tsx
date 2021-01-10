Account Listing Pageimport React, { useContext, useEffect } from 'react'
import AppContext from 'containers/App/Store/AppContext'
import { useHistory, useLocation, useParams } from 'react-router'
import MainHeader from '@ifca-root/react-component/src/components/Header/MainHeader'
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { ContentWrapper } from 'components/Layout/ContentWrapper'
import FloatButton from '@ifca-root/react-component/src/components/Button/FloatButton'
import IconText from '@ifca-root/react-component/src/components/Typography/IconText'
import { useGetAccountQuery } from 'generated/graphql'
import { useMenuOption } from 'helpers/CustomHooks/useMenuOption'

export const AccountListing = (props: any) => {
  const { globalState, dispatch } = useContext(AppContext as any)
  let history = useHistory()
  let location = useLocation()

  const { anchorEl, menu, handleClick, handleClose } = useMenuOption()

  const {
    data: { getAccount } = { getAccount: [] },
    loading,
    error,
  } = useGetAccountQuery()
  console.log('AccountListing -> getAccount', getAccount)

 
  return (
    <>
      <MainHeader
        mainBtn="back"
        onClick={() => history.push('/home')}
        smTitle="Main"
        title="Accounts"
        routeSegments={[{ name: 'Main' }, { name: 'Accounts', current: true }]}
      />

      <List className="core-list subheader">
        <ListItem>
          <ListItemText
            primary={
              <>
                <span className="text highlight-text">Accounts</span>
              </>
            }
            secondary={
              <span className="desc">
                <span className="text">Active</span>
                <span className="highlight-text">
                  {' '}
                  {getAccount.length || 0}
                </span>
              </span>
            }
          />
        </ListItem>
      </List>

      <ContentWrapper>
        {getAccount?.map((el, index) => (
          <List className="core-list">
            <ListItem
              key={index}
              onClick={() =>
                history.push({
                  pathname: `/account/${el.ID}/submenu`,
                  state: el,
                })
              }
            >
              <ListItemText
                primary={
                  <>
                    <span className="xsTitle text flex-space">{el.name}</span>
                    <span className="xsTitle color-orange">MYR</span>
                  </>
                }
                secondary={
                  <>
                    <span className="desc text ">Active Product: </span>
                    <span className="desc highlight-text flex-space">
                      {el?.subscription?.length}
                    </span>
                    <IconText>{''}</IconText>
                    <span className="desc color-red fw-semibold">{''}</span>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={e => handleClick(e, el.ID, index, getAccount[index])}
                >
                  <KeyboardArrowRight
                    onClick={() =>
                      history.push({
                        pathname: `/account/${el.ID}/submenu`,
                        state: el,
                      })
                    }
                  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        ))}
        <FloatButton onClick={() => history.push('/account/add')} />
      </ContentWrapper>
    </>
  )
}
