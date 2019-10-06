import { observer } from 'mobx-react';
import * as React from 'react';

import { AppStore } from '../../services/AppStore';

import { MiddlePanel, Row, Section } from '../../common-elements/';
import { ExternalDocumentation } from '../ExternalDocumentation/ExternalDocumentation';
import { Markdown } from '../Markdown/Markdown';
import { StyledMarkdownBlock } from '../Markdown/styled.elements';
import {
  ApiHeader,
  DownloadButton,
  InfoSpan,
  InfoSpanBox,
  InfoSpanBoxWrap,
} from './styled.elements';

export interface ApiInfoProps {
  store: AppStore;
}

@observer
export class ApiInfo extends React.Component<ApiInfoProps> {
  handleDownloadClick = e => {
    if (!e.target.href) {
      e.target.href = this.props.store.spec.info.downloadLink;
    }
  };

  render() {
    const { store } = this.props;
    const { info, externalDocs } = store.spec;
    const hideDownloadButton = store.options.hideDownloadButton;

    const downloadFilename = info.downloadFileName;
    const downloadLink = info.downloadLink;

    const license =
      // TODO: replace with the localized solution
      (info.license && (
        <InfoSpan>
          لایسنس: <a href={info.license.url}>{info.license.name}</a>
        </InfoSpan>
      )) ||
      null;

    const website =
      // TODO: replace with the localized solution
      (info.contact && info.contact.url && (
        <InfoSpan>
          آدرس: <a href={info.contact.url}>{info.contact.url}</a>
        </InfoSpan>
      )) ||
      null;

    const email =
      // TODO: replace with the localized solution
      (info.contact && info.contact.email && (
        <InfoSpan>
          {info.contact.name || 'ایمیل'}:{' '}
          <a href={'mailto:' + info.contact.email}>{info.contact.email}</a>
        </InfoSpan>
      )) ||
      null;

    const terms =
      // TODO: replace with the localized solution
      (info.termsOfService && (
        <InfoSpan>
          <a href={info.termsOfService}>قوانین و شزایط</a>
        </InfoSpan>
      )) ||
      null;

    const version = (info.version && <span>({info.version})</span>) || null;

    // TODO: replace with the localized solution
    return (
      <Section>
        <Row>
          <MiddlePanel className="api-info">
            <ApiHeader>
              {info.title} {version}
            </ApiHeader>
            {!hideDownloadButton && (
              <p>
                دانلود اطلاعات OpenApi :
                <DownloadButton
                  download={downloadFilename}
                  target="_blank"
                  href={downloadLink}
                  onClick={this.handleDownloadClick}
                >
                  دانلود
                </DownloadButton>
              </p>
            )}
            <StyledMarkdownBlock>
              {((info.license || info.contact || info.termsOfService) && (
                <InfoSpanBoxWrap>
                  <InfoSpanBox>
                    {email} {website} {license} {terms}
                  </InfoSpanBox>
                </InfoSpanBoxWrap>
              )) ||
                null}
            </StyledMarkdownBlock>
            <Markdown source={store.spec.info.description} />
            {externalDocs && <ExternalDocumentation externalDocs={externalDocs} />}
          </MiddlePanel>
        </Row>
      </Section>
    );
  }
}
