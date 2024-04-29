(function ($) {
	$.fn.simpleMobileMenu = function (options) {
		const defaults = {
			hamburgerId: "sm_menu_ham",
			wrapperClass: "sm_menu_outer",
			submenuClass: "submenu",
			menuStyle: "slide",
			onMenuLoad: () => true,
			onMenuToggle: () => true,
		};

		const settings = $.extend({}, defaults, options);
		const $menu = this;
		const $hamburger = $("<div/>", {
			id: settings.hamburgerId,
			html: "<span></span><span></span><span></span><span></span>",
		});
		const $wrapper = $("<div/>", {
			class: `${settings.wrapperClass} ${settings.menuStyle.toLowerCase()}`,
		}).append($menu);

		const createBackButton = () => {
			$wrapper.find(`ul.${settings.submenuClass}`).each(function () {
				const $submenu = $(this);
				const $parentLi = $submenu.closest("li");
				const $firstAnchor = $parentLi.find("> a");
				const $backLink = $("<li/>", {
					class: "back",
					html: `<a href='#'>${$firstAnchor.text()}</a>`,
				});

				$parentLi.addClass("hasChild");
				if (settings.menuStyle.toLowerCase() === "slide") {
					$backLink.prependTo($submenu);
				}
			});
		};

		const toggleMobileMenu = () => {
			const $hamburger = $("#" + settings.hamburgerId);
			const $wrapper = $("." + settings.wrapperClass);

			$hamburger.toggleClass("open");
			$wrapper.toggleClass("active").find("li.active").removeClass("active");
			$("body").toggleClass("mmactive");

			if (settings.menuStyle.toLowerCase() === "accordion") {
				$wrapper.find(`ul.${settings.submenuClass}`).hide();
			}

			settings.onMenuToggle($menu, $hamburger.hasClass("open"));
		};

		const showSlideSubMenu = function (e) {
			e.preventDefault();
			const $parentLi = $(this).parent();
			$parentLi.addClass("active").siblings().removeClass("active");
			const $submenu = $parentLi.find(`> .${settings.submenuClass}`);
			const submenuTop =
				$submenu.offset().top - $wrapper.offset().top + $wrapper.scrollTop();
			$wrapper.scrollTop(submenuTop);
		};

		const showAccordionSubMenu = function (e) {
			e.preventDefault();
			const $this = $(this);
			const $parent = $this.parent();
			const $lastActive = $parent.siblings(".active");

			$parent.find(`> .${settings.submenuClass}`).slideToggle(() => {
				if ($(this).is(":visible")) {
					const offset = $this[0].offsetTop;
					$wrapper.stop().animate({ scrollTop: offset }, 300);
				}
			});

			$lastActive.find(`ul.${settings.submenuClass}`).slideUp(() => {
				$(this).find(".hasChild").removeClass("active");
			});

			$parent.toggleClass("active").siblings().removeClass("active");
		};

		const goBack = function (e) {
			e.preventDefault();
			$(this)
				.closest(`ul.${settings.submenuClass}`)
				.parent()
				.removeClass("active");
		};

		// Initialization
		$menu.appendTo($wrapper);
		$hamburger.add($wrapper).appendTo("body");
		createBackButton();

		// Event listeners using .on('click', function)
		$hamburger.on("click", toggleMobileMenu);
		$wrapper
			.filter(".slide")
			.find("li.hasChild > a")
			.on("click", showSlideSubMenu);
		$wrapper
			.filter(".accordion")
			.find("li.hasChild > a")
			.on("click", showAccordionSubMenu);
		$wrapper.find("li.back a").on("click", goBack);

		// Callback - Menu loaded
		settings.onMenuLoad($menu);

		return this;
	};
})(jQuery);
