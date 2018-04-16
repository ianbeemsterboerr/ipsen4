<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/*
matches: [
	{
		id: 1,
		opponents: [
			{
				team_id: 0,
				name: "Team A"
			},
			{
				team_id: 1,
				name: "Team B"
			}
		],
		results: [
			{
				team_id: 0,
				score: 1,
				special: "blob"
			},
			{
				team_id: 1,
				score: 0,
				special: "blob"
			}
		],
		parent_id: 0,
		sibling_up: 2,
		siblinig_down: 3
	}
]
*/

$router->get('/', function () use ($router) {
    $response = "<hr><a href = '" . url('/api/v1/tournament/1/schedule/') ."'> Proceed to schedule endpoint </a>";
    return "Dit is de DEV branch <hr>" . $router->app->version() . $response;
});

$router->get('api/v1/tournament/{id}/schedule', function ($tournamentId) use ($router) {
    $tournament = array('matches' => array() );
    $tournamentId = 1;
    $matches =  app('db')->table('Match')
                  ->select('id', 'parent_matchid')
                  ->where('tournament_id', $tournamentId)
                  ->orderBy('id', 'asc')
                ->get();

    foreach($matches as $match){
      $m = array( 'id'            =>  $match->id,
                  'parent_id'     =>  $match->parent_matchid,
                  'sibling_up'    =>  -1,
                  'sibling_down'  =>  -1,
                  'results'       =>  array(),
                  'opponents'     =>  array()
                );
      $opponents =  app('db')->table('Opponent')
                      ->select('teamid')
                      ->where('matchid', $match->id)
                      ->orderBy('teamid', 'asc')
                    ->get();
      foreach($opponents as $opponent){
        //add to $opponents
        //add results for opponent
        array_push($m['opponents'], array('team_id' => $opponent->teamid, 'name' => 'Team '.$opponent->teamid));
        $result =   app('db')->table('Result')
                      ->select('id', 'score')
                      ->where('matchid', $match->id)
                      ->where('teamid', $opponent->teamid)
                    ->first();
        
        if(! is_null($result) ){
          $result_special =   app('db')->table('special_result')
                                ->select('data')
                                ->where('resultid', $result->id)
                              ->first();
          $special = (is_null($result_special) ? '' : $result_special->data);

          array_push($m['results'], array( 'team_id' => $opponent->teamid,
                                                    'score' => $result->score,
                                                    'special' => $special
                                          )
          );
        }
      }
      array_push($tournament['matches'], $m);
    }


    return json_encode($tournament);
});
