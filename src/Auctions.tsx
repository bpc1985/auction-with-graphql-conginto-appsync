import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import {AuctionCard} from './AuctionCard';
import { listAuctions } from "./graphql/queries";
import { onCreateAuction } from "./graphql/subscriptions";
import { ListAuctionsQuery, ListAuctionsQueryVariables } from "./API";

import { OnMount } from './components/OnMount';
import { buildSubscription } from "aws-appsync";

export const Auctions = () => {
    return (
      <Query<ListAuctionsQuery, ListAuctionsQueryVariables>
        query={gql(listAuctions)}
        variables={{ limit: 100 }}
      >
        {({ data, loading, subscribeToMore }) => {
          if (
            loading ||
            !data ||
            !data.listAuctions ||
            !data.listAuctions.items
          ) {
            return null;
          }

          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: 10
              }}
            >
              <OnMount onEffect={() => {
                return subscribeToMore(
                  buildSubscription(
                    gql(onCreateAuction),
                    gql(listAuctions)
                  )
                );
              }} />

              {data.listAuctions.items.map((x:any) => (
                <AuctionCard name={x!.name} price={x!.price} key={x!.id} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  };