document.addEventListener("DOMContentLoaded", function () {
  const phoneInputField = document.querySelector("#phone");

  const phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "auto",
      separateDialCode: true,
      preferredCountries: ["br", "us", "ca", "gb", "de", "fr", "pt", "jp"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  function setCountryByIP() {
      fetch("https://ipinfo.io/json?token=bda67caaa3f85b")
          .then(response => response.json())
          .then(data => {
              if (data && data.country) {
                  const countryCode = data.country.toLowerCase();
                  phoneInput.setCountry(countryCode);
              } else {
                  phoneInput.setCountry("br");
              }
          })
          .catch(error => {
              phoneInput.setCountry("br");
          });
  }

  setCountryByIP();

  let maxDigits = 15;
  let lastValue = ""; 



  function applyPhoneMask(event) {
      const countryData = phoneInput.getSelectedCountryData();
      const countryCode = countryData.iso2.toUpperCase();
      let rawNumber = phoneInputField.value.replace(/\D/g, ""); 

      const maxDigits = getMaxDigitsForCountry(countryCode);

      if (rawNumber.length > maxDigits) {
          event.preventDefault();
          rawNumber = rawNumber.substring(0, maxDigits);
      }

      let formattedNumber = "";
      try {
          formattedNumber = new libphonenumber.AsYouType(countryCode).input(rawNumber);
      } catch (error) {
          formattedNumber = rawNumber;
      }

      if (event && event.inputType === "deleteContentBackward") {
          lastValue = phoneInputField.value;
          return;
      }

      phoneInputField.value = formattedNumber;
      lastValue = formattedNumber;
  }


  function getMaxDigitsForCountry(countryCode) {
      const countryMaxDigits = {
          US: 10, 
          CA: 10, 
          BR: 11, 
          GB: 10, 
          FR: 9,  
          DE: 11, 
          IN: 10, 
          MX: 10, 
          AU: 9, 
          JP: 10, 
          PT: 9
      };

      return countryMaxDigits[countryCode] || 15; 
  }



  phoneInputField.addEventListener("keydown", function (event) {
      const rawNumber = phoneInputField.value.replace(/\D/g, "");

      if (rawNumber.length >= maxDigits && event.keyCode >= 48 && event.keyCode <= 57) {
          event.preventDefault();
      }
  });

  phoneInputField.addEventListener("keypress", function (event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
          event.preventDefault();
      }
  });

  phoneInputField.addEventListener("paste", function (event) {
      event.preventDefault();
      let pastedText = (event.clipboardData || window.clipboardData).getData("text");
      phoneInputField.value = pastedText.replace(/\D/g, "").substring(0, maxDigits);
      applyPhoneMask();
  });

  phoneInputField.addEventListener("countrychange", function () {
      phoneInputField.value = "";
      lastValue = "";
      applyPhoneMask();
  });

  phoneInputField.addEventListener("input", applyPhoneMask);



  // Função para calcular o tempo restante
  function calculateCountdown() {
  // Data de hoje
  const currentDate = new Date();

  // Data alvo (8 de janeiro)
  const targetDate = new Date('August 9, 2025 09:30:00');

  // Calcula a diferença em milissegundos
  const difference = targetDate - currentDate;

  // Converte a diferença para horas, minutos e segundos
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  // Exibe o resultado na página
  dias = document.getElementById('dias')
  dias.innerHTML = `${days}`
  horas = document.getElementById('horas')
  horas.innerHTML = `${hours}`
  minutos = document.getElementById('minutos')
  minutos.innerHTML = `${minutes}`
  segundos = document.getElementById('segundos')
  segundos.innerHTML = `${seconds}`
  }

  // Atualiza o contador a cada segundo
  setInterval(calculateCountdown, 1000);

  // Chama a função pela primeira vez para evitar atraso inicial
  calculateCountdown();

  window.clicou_form_pag = function() {
    const phoneNumber = phoneInput.getNumber();
    nome_digitado = document.getElementById("nome_form_pag");
    email_digitado = document.getElementById("email_form_pag");
    zap_digitado = document.getElementById("phone");

    if (!phoneInput.isValidNumber()) {
      alert('Insira um número de telefone válido!');
      return false;
    } 

    //valida nome e zap
    if(nome_digitado.value.length < 1){
      alert("Digite um nome válido!");
      return false;
    }

    //valida email
    var re = /\S+@\S+\.\S+/;
    check_email = re.test(email_digitado.value);
    if(check_email == false){
      alert("Digite um email válido!");
      return false;
    }

    //valida o zap
    if(zap_digitado.value.length < 1){
      alert("Digite um número de zap válido!");
      return false;
    }


    nome_envio = document.getElementById("firstname");
    email_envio = document.getElementById("email");
    zap_envio = document.getElementById("field[1]");

    //preenche nome e email
    nome_envio.value = nome_digitado.value;
    email_envio.value = email_digitado.value;

    //preenche o zap com ddi
    const collection = document.getElementsByClassName("iti__selected-flag");
    for (let i = 0; i < collection.length; i++) {
      ddi_dig = collection[i].title;
    }
    const strddicompleta = ddi_dig;
    const strddisplit = strddicompleta.split('+');
    ddi_so_num = strddisplit[1];
    numero_digitado = zap_digitado.value;
    var zap_completo_com_ddi = ddi_so_num.concat(numero_digitado);
    var zap_limpo = zap_completo_com_ddi.replace(/[^0-9]/g,'');
    zap_envio.value = zap_limpo;


    //UTMs
    //coleta os dados da url
    url_total = top.location.href;

    //coleta utm_source - será o field[7]
    array_url_utm_source_a = url_total.split("utm_source=");
    if(array_url_utm_source_a.length>1){
        array_url_utm_source_b = array_url_utm_source_a[1].split("&");
        utm_source_val = array_url_utm_source_b[0];
        const utm_source_hid = document.getElementsByName("field[7]");
        for (let i = 0; i < utm_source_hid.length; i++) {
          utm_source_hid[i].value = utm_source_val;
        }
    }

    //coleta utm_medium - será o field[8]
    array_url_utm_medium_a = url_total.split("utm_medium=");
    if(array_url_utm_medium_a.length>1){
        array_url_utm_medium_b = array_url_utm_medium_a[1].split("&");
        utm_medium_val = array_url_utm_medium_b[0];
        const utm_medium_hid = document.getElementsByName("field[8]");
        for (let i = 0; i < utm_medium_hid.length; i++) {
          utm_medium_hid[i].value = utm_medium_val;
        }
    }

    //coleta utm_content - será o field[10]
    array_url_utm_content_a = url_total.split("utm_content=");
    if(array_url_utm_content_a.length>1){
        array_url_utm_content_b = array_url_utm_content_a[1].split("&");
        utm_content_val = array_url_utm_content_b[0];
        const utm_content_hid = document.getElementsByName("field[10]");
        for (let i = 0; i < utm_content_hid.length; i++) {
          utm_content_hid[i].value = utm_content_val;
        }
    }

    //coleta utm_campaign - será o field[9]
    array_url_utm_campaign_a = url_total.split("utm_campaign=");
    if(array_url_utm_campaign_a.length>1){
        array_url_utm_campaign_b = array_url_utm_campaign_a[1].split("&");
        utm_campaign_val = array_url_utm_campaign_b[0];
        const utm_campaign_hid = document.getElementsByName("field[9]");
        for (let i = 0; i < utm_campaign_hid.length; i++) {
          utm_campaign_hid[i].value = utm_campaign_val;
        }
    }

    const forms = document.getElementsByClassName("_form");
    if (forms.length > 0) {
        forms[0].submit();
    }

    
    return false;
  }


});

