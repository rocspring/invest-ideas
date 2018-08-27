import tushare as ts

print(ts.__version__)

data = ts.get_k_data('600519')

data.to_json('./data/maotai_data.json', orient='records')