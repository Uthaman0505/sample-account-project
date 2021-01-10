import CardContents from '@ifca-root/react-component/src/components/CardList/CardContents'
import MainHeader from '@ifca-root/react-component/src/components/Header/MainHeader'
import TextSeparator from '@ifca-root/react-component/src/components/Typography/TextSeparator'
import { IconButton, List, ListItem, ListItemText } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { ContentWrapper } from 'components/Layout/ContentWrapper'
import AppContext from 'containers/App/Store/AppContext'
import { useGetAccountQuery, useGetCurrencyQuery } from 'generated/graphql'
import React, { useContext, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import EditIcon from '@material-ui/icons/Edit'
import { useMenuOption } from 'helpers/CustomHooks/useMenuOption'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'

export const AccountInfo = props => {
  // const { globalState, dispatch } = useContext(AppContext as any)
  let history = useHistory()
  let { accountID } = useParams()
  let location = useLocation()
  const viewData: any = location?.state

  const { anchorEl, menu, handleClick, handleClose } = useMenuOption()

  const { data: { getAccount } = { getAccount: [] } } = useGetAccountQuery({
    variables: { ID: accountID },
    fetchPolicy: 'network-only',
  })

  const activeSubs = getAccount[0]?.subscription?.filter(x => !x.isTerminated)

  const { data: { getCurrency } = { getCurrency: [] } } = useGetCurrencyQuery({
    variables: { ID: getAccount[0]?.currencyID },
    // fetchPolicy: 'network-only',
  })
  console.log('accountid', accountID)

  // useEffect(() => {
  //   console.log('viewdata', viewData)

  //   console.log(location)
  // })

  return (
    <>
      <MainHeader
        mainBtn="back"
        onClick={() =>
          history.push({
            pathname: `/account/${getAccount[0]?.ID}/submenu`,
            state: location?.state,
          })
        }
        smTitle="Main"
        title={`${getAccount[0]?.name}`}
        routeSegments={[
          { name: 'Main' },
          { name: 'Accounts' },
          { name: 'Submenu' },
          { name: 'Account Info', current: true },
        ]}
      />

      <List className="core-list subheader">
        {/* {getAccount.map((el, index) => ( */}
        <ListItem>
          <ListItemText
            primary={
              <>
                <span className="text highlight-text">
                  {getAccount[0]?.name}
                </span>
              </>
            }
            secondary={
              <span className="desc">
                <span className="text">Active Product: </span>
                <span className="highlight-text">{activeSubs?.length}</span>
              </span>
            }
          />
        </ListItem>
        {/* ))} */}
      </List>
      {/* {getAccount.map((el, index) => ( */}
      <ContentWrapper>
        <CardContents
          section={{
            header: {
              title: 'Account Info',
              icon: (
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() =>
                    history.push({
                      pathname: `/account/${accountID}/edit`,
                      state: viewData,
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
              ),
            },
          }}
        >
          <div className="content-wrap full">
            <div className="desc">Account Name</div>
            <div className="xsTitle">{getAccount[0]?.name}</div>
          </div>
          <div className="content-wrap">
            <div className="desc">Account Code.</div>
            <div className="xsTitle">{getAccount[0]?.code}</div>
          </div>
          <div className="content-wrap">
            <div className="desc">Registration No</div>
            <div className="xsTitle">{getAccount[0]?.regNo}</div>
          </div>
          <div className="content-wrap full">
            <div className="desc">Address</div>
            <div className="xsTitle text-noflow">
              {getAccount[0]?.address?.address}{' '}
              {getAccount[0]?.address?.address2}{' '}
              {getAccount[0]?.address?.postCode} {getAccount[0]?.address?.city}{' '}
              {getAccount[0]?.address?.state} {getAccount[0]?.address?.country}{' '}
            </div>
          </div>
          <div className="content-wrap">
            <div className="desc">Contact No.</div>
            <div className="xsTitle">+6 {getAccount[0]?.contactNo}</div>
          </div>
          <div className="content-wrap">
            <div className="desc">Email Address</div>
            <div className="xsTitle">{getAccount[0]?.email}</div>
          </div>
          <div className="content-wrap full">
            <div className="desc">Currency</div>
            <div className="xsTitle">{getCurrency[0]?.name}</div>
          </div>
        </CardContents>
        <CardContents
          section={{
            header: {
              title: 'Contact Details',
            },
          }}
        >
          <div className="content-wrap full ">
            <div className="desc xsTitle flex-space">
              {getAccount[0]?.contactPerson?.name}
              <TextSeparator />
              {getAccount[0]?.contactPerson?.designation}
              <div>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  // onClick={() =>
                  //   history.push({
                  //     pathname: `/account/${accountID}/edit`,
                  //     state: viewData,
                  //   })
                  // }
                >
                  <WhatsAppIcon className="color-green" />
                </IconButton>
              </div>
            </div>
          </div>
          <span className="desc">
            <span className="highlight-text click-text">
              +6 {getAccount[0]?.contactPerson?.contactNo}
            </span>
            <TextSeparator />
            <span className="click-text">
              {getAccount[0]?.contactPerson?.email}
            </span>
          </span>
        </CardContents>
      </ContentWrapper>
      {/* ))} */}
    </>
  )
}
