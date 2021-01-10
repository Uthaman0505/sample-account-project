import React, { ChangeEvent, useContext, useState } from 'react'
import AppContext from 'containers/App/Store/AppContext'
import { useHistory, useLocation, useParams } from 'react-router'
import MainHeader from '@ifca-root/react-component/src/components/Header/MainHeader'
import { MenuItem, TextField } from '@material-ui/core'
import SubHeaderAction from '@ifca-root/react-component/src/components/Header/SubHeaderAction'
import CardContents from '@ifca-root/react-component/src/components/CardList/CardContents'
import { ContentWrapper } from 'components/Layout/ContentWrapper'
import {
  GetAccountDocument,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useGetCurrencyQuery,
  useGetAccountQuery,
} from 'generated/graphql'
import { Controller, useForm } from 'react-hook-form'

interface IAccountForm {
  ID: string
  name: string
  code: string
  regNo: string
  address: string
  city: string
  state: string
  postcode: string
  country: string
  contactNo: string
  email: string
  currencyID: string
  CPname: string
  designation: string
  CPcontactNo: string
  CPemail: string
  address1: string
  address2: string
}

export const AccountForm = (props: any) => {
  const { mode } = props

  const modeText = mode === 'edit' ? 'Edit' : 'New'

  const { globalState, dispatch } = useContext(AppContext as any)
  let history = useHistory()
  //const [createAccount] = useCreateAccountMutation()

  let location = useLocation()
  const editData: any = location?.state
  console.log('editData', editData)

  let { accountID } = useParams()

  // const [contracts, setContracts] = useState('ABC Sdn bhd')
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setContracts(event.target.value)
  // }

  const { data: { getAccount } = { getAccount: [] } } = useGetAccountQuery({
    variables: { ID: accountID },
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //setContracts(event.target.value)
  }

  const { data: { getCurrency } = { getCurrency: [] } } = useGetCurrencyQuery()
  const [contracts, setContracts] = useState()

  const { handleSubmit, register, errors, control } = useForm<IAccountForm>({
    defaultValues: {
     
    },
  })

  const [
    createAccount,
    { loading: mutationLoading, error: mutationError },
  ] = useCreateAccountMutation({
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      history.push('/account')
      console.log(history)
    },
  })

  const [
    updateAccount,
    { loading: updateLoading, error: updateError },
  ] = useUpdateAccountMutation({
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      history.push(`/account/submenu/${accountID}/info`)
      console.log(history)
      // console.log(data)
    },
  })

  const onSubmit = data => {
    console.log('data', data)

    mode === 'add'
      ? createAccount({
          variables: {
            input: {
              name: data.name,
              code: data.code,
              regNo: data.regNo,
              address: {
                address: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                postCode: data.postcode,
                country: data.country,
              },
              email: data.email,
              contactNo: data.contactNo,
              currencyID: data.currencyID,
              contactPerson: {
                name: data.CPname,
                designation: data.designation,
                contactNo: data.CPcontactNo,
                email: data.CPemail,
              },
            },
          },
          refetchQueries: [
            { query: GetAccountDocument, variables: { ID: accountID } },
          ],
        })
      : updateAccount({
          variables: {
            input: {
              ID: accountID,
              name: data.name,
              code: data.code,
              regNo: data.regNo,
              currencyID: data.currencyID,
              address: {
                address: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                postCode: data.postcode,
                country: data.country,
              },
              email: data.email,
              contactNo: data.contactNo,
              contactPerson: {
                name: data.CPname,
                designation: data.designation,
                contactNo: data.CPcontactNo,
                email: data.CPemail,
              },
            },
          },
          refetchQueries: [
            {
              query: GetAccountDocument,
            },
          ],
        })
  }

   return (
    <>
      <MainHeader
        mainBtn="close"
        onClick={() => history.push('/account')}
        smTitle="Main"
        title="Accounts"
        routeSegments={[
          { name: 'Main' },
          { name: 'Accounts' },
          { name: `${modeText}`, current: true },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} id="submit-form">
        <SubHeaderAction
          title={`${modeText} Account`}
          actionTitle="SAVE"
          action={() => history.push('/account')}
        />

        <ContentWrapper>
          <CardContents>
            <Controller
              as={TextField}
              required
              fullWidth
              label="Account Name"
              name="name"
              defaultValue={mode === 'edit' ? getAccount[0]?.name : ''}
              control={control}
              inputRef={register({})}
            />
            <Controller
              as={TextField}
              required
              fullWidth
              label="Account Code"
              name="code"
              defaultValue={mode === 'edit' ? getAccount[0]?.code : ''}
              control={control}
              inputRef={register({})}
            />
            <Controller
              as={TextField}
              required
              fullWidth
              label="Registration No. "
              name="regNo"
              defaultValue={mode === 'edit' ? getAccount[0]?.regNo : ''}
              control={control}
              inputRef={register({})}
            />
            <Controller
              as={TextField}
              fullWidth
              required
              label="Address 1 "
              name="address1"
              defaultValue={
                mode === 'edit' ? getAccount[0]?.address?.address : ''
              }
              control={control}
              inputRef={register({})}
            />
            <Controller
              as={TextField}
              required
              fullWidth
              label="Address 2 "
              name="address2"
              defaultValue={
                mode === 'edit' ? getAccount[0]?.address?.address2 : ''
              }
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              fullWidth
              required
              label="City "
              name="city"
              defaultValue={mode === 'edit' ? getAccount[0]?.address?.city : ''}
              className="left"
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              fullWidth
              required
              label="State "
              name="state"
              defaultValue={
                mode === 'edit' ? getAccount[0]?.address?.state : ''
              }
              className="right"
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              fullWidth
              required
              label="Postcode "
              name="postcode"
              defaultValue={
                mode === 'edit' ? getAccount[0]?.address?.postCode : ''
              }
              className="left"
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              fullWidth
              required
              label="Country"
              name="country"
              className="left"
              defaultValue={
                mode === 'edit' ? getAccount[0]?.address?.country : ''
              }
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              required
              fullWidth
              label="Contact No. "
              name="contactNo"
              defaultValue={mode === 'edit' ? getAccount[0]?.contactNo : ''}
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={TextField}
              required
              fullWidth
              label="Email Address. "
              name="email"
              defaultValue={mode === 'edit' ? getAccount[0]?.email : ''}
              control={control}
              inputRef={register({})}
            />

            <Controller
              as={
                <TextField onChange={handleChange}>
                  {getCurrency.map(product => (
                    <MenuItem
                      key={product.name}
                      // value passing the ID
                      value={product.ID}
                    >
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
              }
              fullWidth
              id="standard-select-currency"
              select
              required
              name="currencyID"
              label="Currency"
              // margin="normal"
              //defaultValue={''}
              defaultValue={mode === 'edit' ? getAccount[0]?.currencyID : ''}
              value={contracts}
              inputRef={register({})}
              control={control}
            />
          </CardContents>
        </ContentWrapper>
      </form>
      <ContentWrapper>
        <CardContents
          section={{
            header: {
              title: 'Contact Details',
            },
          }}
        >
          <Controller
            as={TextField}
            required
            fullWidth
            label="Name "
            name="CPname"
            defaultValue={
              mode === 'edit' ? getAccount[0]?.contactPerson?.name : ''
            }
            control={control}
            inputRef={register({})}
          />

          <Controller
            as={TextField}
            required
            fullWidth
            label="Designation "
            name="designation"
            defaultValue={
              mode === 'edit' ? getAccount[0]?.contactPerson?.designation : ''
            }
            control={control}
            inputRef={register({})}
          />

          <Controller
            as={TextField}
            required
            fullWidth
            label="Mobile No. "
            name="CPcontactNo"
            defaultValue={
              mode === 'edit' ? getAccount[0]?.contactPerson?.contactNo : ''
            }
            control={control}
            inputRef={register({})}
          />

          <Controller
            as={TextField}
            required
            fullWidth
            label="Email Address "
            name="CPemail"
            defaultValue={
              mode === 'edit' ? getAccount[0]?.contactPerson?.email : ''
            }
            control={control}
            inputRef={register({})}
          />
        </CardContents>
      </ContentWrapper>
    </>
  )
}
