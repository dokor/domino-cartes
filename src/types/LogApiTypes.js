// @flow


export type LogList = Log[];
export type Log = {
  +api: string,
  +bodyRequest: string,
  +bodyResponse: string,
  +date: string,
  +headerRequest: Header,
  +headerResponse: Header,
  +id: string,
  +isCompleteTextRequest: boolean,
  +isCompleteTextResponse: boolean,
  +method: string,
  +statusCode: string,
  +url: string,
};

export type Header = {
  +header: HeaderDetails[],
  +mode: string,
};

export type HeaderDetails = {
  +id: string,
  +idLogApi: string,
  +key: string,
  +type: string,
  +value: string,
}

