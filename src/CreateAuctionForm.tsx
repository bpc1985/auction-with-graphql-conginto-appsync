import * as React from 'react';
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {createAuction} from './graphql/mutations';
import {
  CreateAuctionMutation,
  CreateAuctionMutationVariables,
  ListAuctionsQuery
} from "./API";
// import { listAuctions } from './graphql/queries';
// import { produce } from 'immer';

interface FormValues {
  name: string;
  price: number;
}

export const CreateAuctionForm = () => {
  return (
    <Mutation<CreateAuctionMutation, CreateAuctionMutationVariables>
      mutation={gql(createAuction)}>
    {(callCreateAuctionFn) => (
      <Formik<FormValues>
        initialValues={{
          name: '',
          price: 0
        }}
        onSubmit={async ({name, price}, { resetForm }) => {
          // call mutation
          const response = await callCreateAuctionFn({
            variables: {
              input: {
                name,
                price
              }
            },
            /*
            refetchQueries: [
              {query: gql(listAuctions), variables: {limit: 100}}
            ]

            optimisticResponse: {
              createAuction: {
                __typename: 'Auction',
                id: '-1',
                name,
                price
              }
            },
            update: (store, {data}) => {
              if (!data || !data.createAuction) {
                return ;
              }

              const auctions = store.readQuery<ListAuctionsQuery>({
                query: gql(listAuctions),
                variables: { limit: 100 }
              });

              store.writeQuery({
                query: gql(listAuctions),
                variables: { limit: 100 },
                data: produce(auctions, (ds:any) => {
                  ds!.listAuctions!.items!.unshift(
                    data.createAuction
                  )
                })
              });
            }
             */
          });
          resetForm();
        }}>
        {({values, handleChange, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <TextField 
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="price"
              label="Price"
              value={values.price}
              onChange={handleChange}
              margin="normal"
            />
            <br />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    )}
    </Mutation>
  );
}