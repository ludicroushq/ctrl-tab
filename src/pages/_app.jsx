import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import pkg from '../../package.json';

import '../assets/css/index.scss';

export default class extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Head>
          <title>ctrl tab</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" hid="description" content={pkg.description} />
        </Head>
        <Component />
      </Container>
    );
  }
}
