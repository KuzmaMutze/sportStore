$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 500,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                  dots:true,
                  arrows:false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content-wrapp').removeClass('catalog__content-wrapp_active').eq($(this).index()).addClass('catalog__content-wrapp_active');
      });

      $(".catalog-item__link").each(function(i) {
          $(this).on("click", function(e){
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
      });

      $(".catalog-item__back").each(function(i) {
        $(this).on("click", function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    // Modal

    $('[data-modal=consulation]').on('click', function() {
      $('.overlay,#consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });



    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__name').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay,#order').fadeIn();
      });
    });
    // // model // 

    // validate //

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Пожалуйста, введите своё имя",
            minlength: jQuery.validator.format("Введите {0} символов!")
          },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправельно введен адрес почты"
          } 
        }
      });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // / validation //


    // mask
    $('input[name=phone]').mask("+7(999) 999-9999");
    // /mask //

    // php //
    $('form').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    // php //

    // smooth scroll/ //
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
  });

  