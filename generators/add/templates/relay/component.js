'use strict';

import React from 'react';
import Relay from 'react-relay';
import radium from 'radium';
import Normalize from 'componentsShare/Normalize';

export class <%= name %>Mutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        <%= name.toLowerCase() %>Mutation
      }
    `;
  }

  getVariables() {
    return {
      data: this.props.data
    };
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on data {
            data
          }
        `
      ]
    }];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on data {
        data
      }
    `;
  }
}

@radium
export default class <%= name %> extends React.Component {
  static propTypes = {
    relay: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div>
        <Normalize />
        This is <%= name %>!
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }

  submit() {
    this.props.relay.commitUpdate(
      new <%= name %>Mutation({
        data: 'input'
      }), {
        onFailure: response => console.log(response),
        onSuccess: response => console.log(response)
      }
    );
  }
}
