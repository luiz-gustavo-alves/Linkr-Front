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

export default function URLContent({ data }) {

  return (
    <URLContainer>
      <a href={data.URL} title={data.URL_title} target="blank">
        <URLContentContainer>
          <URLDetails>
            <URLTitle>{data.URL_title}</URLTitle>
            <URLDescription>{data.URL_description}</URLDescription>
            <URL>{data.URL}</URL>
          </URLDetails>
          <URLImageContainer>
            <URLImage src={data.URL_image} />
          </URLImageContainer>
        </URLContentContainer>
      </a>
    </URLContainer>
  )
}