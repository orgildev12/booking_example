// multicity дээр ашиглана

export function postToNewTab_forMulticity(url, data) {
  const f = document.createElement('form');
  f.method = 'GET';
  f.action = url;
  f.target = '_blank';
  Object.entries(data).forEach(([k, v]) => {
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = k;
    inp.value = typeof v === 'object' ? JSON.stringify(v) : v;
    f.appendChild(inp);
  });
  document.body.appendChild(f);
  f.submit();
  document.body.removeChild(f);
}

// multicity гээс бусад үед ашиглана. (oneway, return)
export function postToNewTab_forNormalDirections(url, data) {
  const form = document.createElement('form');
  form.method = 'GET';
  form.action = url;
  form.target = '_blank'; // open in new tab

  const input1 = document.createElement('input');
  input1.type = 'hidden';
  input1.name = 'search';
  input1.value = JSON.stringify(data.search);
  form.appendChild(input1);

  const input2 = document.createElement('input');
  input2.type = 'hidden';
  input2.name = 'portalFacts';
  input2.value = data.portalFacts;
  form.appendChild(input2);

  if (data.lightLogin) {
    const input3 = document.createElement('input');
    input3.type = 'hidden';
    input3.name = 'lightLogin';
    input3.value = JSON.stringify(data.lightLogin);
    form.appendChild(input3);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}


