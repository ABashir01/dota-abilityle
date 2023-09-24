import psycopg2
import os
import json
import sys
import random

class JsonHandler():

    def __init__(self) -> None:
        pass

    # def json_handler(self) -> dict:
    #     try:
    #         with open("Dota/abilitydata/connection_details.json", "r") as f:
    #             data = json.load(f)
    #             return data
    #     except Exception as e:
    #         print("Json File didn't work, error: ", e)
    #         sys.exit()

    def sql_handler(self) -> dict:
        # json_map = self.json_handler()
        # conn = psycopg2.connect(host=json_map["host"], 
        #                             dbname=json_map["dbname"], 
        #                             user=json_map["user"], 
        #                             password=json_map["password"], 
        #                             port=json_map["port"])
        conn = psycopg2.connect("postgres://ahadb:kqWHzDEllas2ydAwNrZ09d8eSzi92Fyp@dpg-ck88el7sasqs73c5vcm0-a.ohio-postgres.render.com/dota_2_abilities")
        cur = conn.cursor()


        try:
            cur.execute("SELECT COUNT(*) FROM dota_2_abilities")
            total_rows = cur.fetchone()[0]

            ability_id = random.randint(0, total_rows)

            cur.execute(f"SELECT * FROM dota_2_abilities WHERE id = {ability_id}")
            ability_row = cur.fetchone()

            cur.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'dota_2_abilities'")
            column_names = [row[0] for row in cur.fetchall()]
            
            ability_dict = {}
            for i in range(len(column_names)):
                ability_dict[column_names[i]] = ability_row[i]

            print(ability_dict)

        except Exception as e:
            print("There was a SQL issue: ", e)


        conn.commit()

        cur.close()
        conn.close()

        return ability_dict

    def get_new_ability(self):
        ability_dict = self.sql_handler()
        with open("ability_data.json", "w") as f:
            json.dump(ability_dict, f)
        
    