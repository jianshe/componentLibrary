/*
 * 分步组件
 *
 */

define(['jquery'], function($) {

	//初始化
	var _loadStep = function(params, container) {

		//基础框架
		var baseHtml = "<div class='ystep-container'>" +
			"<ul class='ystep-container-steps'>" +
			"</ul>" +
			"<div class='ystep-progress'>" +
			"<p class='ystep-progress-bar'>" +
			"<span class='ystep-progress-highlight' style='width:0%'>" +
			"</span>" +
			"</p>" +
			"</div>" +
			"</div>";
		//步骤
		var step1Html = "<li class='ystep-step1-done'>" + "</li>";
		var step2Html = "<li class='ystep-step2-undone'>" + "</li>";
		var step3Html = "<li class='ystep-step3-undone'>" + "</li>";
		var step4Html = "<li class='ystep-step4-undone'>" + "</li>";
		//决策器
		var logic = {
			size: {
				large: function($html) {
					var stepCount = $html.find("li").length - 1,
						containerWidth = (stepCount * 200 + 200) + "px",
						progressWidth = (stepCount * 200) + "px";
					$html.css({
						width: containerWidth
					});
					$html.find(".ystep-progress").css({
						width: progressWidth
					});
					$html.find(".ystep-progress-bar").css({
						width: progressWidth
					});
					$html.addClass("ystep-lg");
				}
			},
			color: {
				green: function($html) {
					$html.addClass("ystep-green");
				},
				blue: function($html) {
					$html.addClass("ystep-blue");
				}
			}
		};

		//支持填充多个步骤容器
		$("." + container).each(function(i, n) {
			var $baseHtml = $(baseHtml),
				$ystepContainerSteps = $baseHtml.find(".ystep-container-steps"),
				arrayLength = 0,
				$n = $(n);
			i = 0;

			//步骤
			arrayLength = params.steps.length;
			for (i = 0; i < arrayLength; i++) {
				var _s = params.steps[i];

				if (i === 0) {
					$step1Html = $(step1Html);
					//构造步骤html
					$step1Html.attr("data-title", _s.title);
					$step1Html.text(_s.title);
					//将步骤插入到步骤列表中
					$ystepContainerSteps.append($step1Html);
					//重置步骤
					$step1Html = $(step1Html);
				} else if (i === 1) {
					$step2Html = $(step2Html);
					//构造步骤html
					$step2Html.attr("data-title", _s.title);
					$step2Html.text(_s.title);
					//将步骤插入到步骤列表中
					$ystepContainerSteps.append($step2Html);
					//重置步骤
					$step2Html = $(step2Html);
				} else if (i === 2) {
					$step3Html = $(step3Html);
					//构造步骤html
					$step3Html.attr("data-title", _s.title);
					$step3Html.text(_s.title);
					//将步骤插入到步骤列表中
					$ystepContainerSteps.append($step3Html);
					//重置步骤
					$step3Html = $(step3Html);
				} else if (i === 3) {
					$step4Html = $(step4Html);
					//构造步骤html
					$step4Html.attr("data-title", _s.title);
					$step4Html.text(_s.title);
					//将步骤插入到步骤列表中
					$ystepContainerSteps.append($step4Html);
					//重置步骤
					$step4Html = $(step4Html);
				}

			}

			//尺寸
			logic.size[params.size || "small"]($baseHtml);
			//配色
			logic.color[params.color || "green"]($baseHtml);

			//插入到容器中
			$n.append($baseHtml);
			//默认执行第一个步骤
			_setStep(1, container);
		});
	};
	//跳转到指定步骤
	var _setStep = function(step, container) {
		$("." + container).each(function(i, n) {
			//获取当前容器下所有的步骤
			var $steps = $(n).find(".ystep-container").find("li");
			var $progress = $(n).find(".ystep-container").find(".ystep-progress-highlight");
			//判断当前步骤是否在范围内
			if (1 <= step && step <= $steps.length) {
				//更新进度
				var scale = "%";
				scale = Math.round((step - 1) * 100 / ($steps.length - 1)) + scale;
				$progress.animate({
					width: scale
				}, {
					speed: 1000,
					done: function() {
						//移动节点
						$steps.each(function(j, m) {
							var _$m = $(m);
							var _j = j + 1;
							if (_j < step) {
								_$m.attr("class", "ystep-step" + _j + "-done");
							} else if (_j === step) {
								_$m.attr("class", "ystep-step" + _j + "-done");
							} else if (_j > step) {
								_$m.attr("class", "ystep-step" + _j + "-undone");
							}
						});
					}
				});
			} else {
				return false;
			}
		});
	};
	//获取当前步骤
	var getStep = function() {
		var result = [];

		$(this)._searchStep(function(i, j, n, m) {
			result.push(j + 1);
		});

		if (result.length === 1) {
			return result[0];
		} else {
			return result;
		}
	};
	//下一个步骤
	var nextStep = function() {
		$(this)._searchStep(function(i, j, n, m) {
			$(n).setStep(j + 2);
		});
	};
	//上一个步骤
	var prevStep = function() {
		$(this)._searchStep(function(i, j, n, m) {
			$(n).setStep(j);
		});
	};
	//通用节点查找
	var _searchStep = function(callback) {
		$(this).each(function(i, n) {
			var $steps = $(n).find(".ystep-container").find("li");
			$steps.each(function(j, m) {
				//判断是否为活动步骤
				if ($(m).attr("class") === "ystep-step-active") {
					if (callback) {
						callback(i, j, n, m);
					}
					return false;
				}
			});
		});
	};
	return {
		loadStep: function(params, container) {
			_loadStep(params, container);
		},
		setStep: function(step, container) {
			_setStep(step, container);
		}
	};
});