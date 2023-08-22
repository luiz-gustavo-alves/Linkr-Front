import {
  URLContainer,
  URLContentContainer,
  URLDetails,
  URLTitle,
  URLDescription,
  URL,
  URLImageContainer,
  URLImage
} from "./style";

import {
  placeholder
} from "../../../assets/images";

export default function URLContent({ data }) {

  const image = (data.URL_image !== "") ? data.URL_image : placeholder;

  return (
    <URLContainer>
      <a data-test="link" href={data.URL} title={data.URL_title} target="blank">
        <URLContentContainer>
          <URLDetails>
            <URLTitle>{data.URL_title}</URLTitle>
            <URLDescription>{data.URL_description}</URLDescription>
            <URL>{data.URL}</URL>
          </URLDetails>
          <URLImageContainer>
            <URLImage src={image} />
          </URLImageContainer>
        </URLContentContainer>
      </a>
    </URLContainer>
  )
}