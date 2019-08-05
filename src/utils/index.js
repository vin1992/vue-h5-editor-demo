const getLocationHref = () => {
  let url = window.location.protocol + "//" + window.location.host + "/";
  return url;
};
export default getLocationHref;
