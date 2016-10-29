app.controller("CategoryArticleController",function($window,$location,$routeParams,$rootScope,$scope,CategoryArticleService){
	setScreenAvailHeight();
	$scope.getCategoryArticles = function(name){
		CategoryArticleService.getArtilces(name).then(function(data){
//			console.log(data);
			$scope.categoryArticles = data.resultData;
		});
	}
	$scope.selectCategory = function(name){
		//需要仔细考虑是否用这个，因为这样每次都会重新发送两次请求
		$location.path("/blog/category/"+name);
	}
	//这里每次点击分类子栏目就会请求一次类别情况，需要优化
	$scope.get = function(){
		CategoryArticleService.get().then(function(data){
//			console.log(data);
			$scope.subNavDatas =  setSubNavData(data.resultData,nav_category,"分类");
			if($routeParams.categoryName!=undefined){
				$scope.categoryName = $routeParams.categoryName;
			}else if(data.resultData!=null && data.resultData.length>0){
				$scope.categoryName = data.resultData[0].name;
			}
//			console.log($scope.categoryName)
			if($scope.categoryName!=undefined){
				$scope.getCategoryArticles($scope.categoryName);
			}
		});
	}
	
	$scope.init = function(){
		$scope.get();
	}
	
	$scope.init();
	
	
});