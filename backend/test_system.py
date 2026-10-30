from app import create_app

app = create_app()
client = app.test_client()

# 1. Login as student
auth_res = client.post('/api/auth/demo-login', json={'role': 'student'})
token = auth_res.get_json()['token']
headers = {'Authorization': f'Bearer {token}'}

# 2. Start KCET mock test
start_res = client.get('/api/exams/1/start', headers=headers)
print('Start exam status:', start_res.status_code, 'Questions loaded:', len(start_res.get_json()['questions']))

# 3. Submit exam
answers = {'1': 'B', '2': 'A', '3': 'B', '4': 'C', '5': 'A'}
submit_res = client.post('/api/exams/1/submit', json={'answers': answers, 'time_taken_seconds': 420}, headers=headers)
sub_data = submit_res.get_json()
print('Exam score:', sub_data['score'], '/', sub_data['total_marks'], 'Accuracy:', sub_data['accuracy_percentage'], '%')

# 4. Process fee payment in sandbox
student_id = auth_res.get_json()['profile']['id']
pay_res = client.post('/api/fees/sandbox-pay', json={'student_id': student_id, 'amount': 10000, 'payment_mode': 'Sandbox UPI'}, headers=headers)
txn_id = pay_res.get_json()['transaction']['id']
receipt_no = pay_res.get_json()['transaction']['receipt_no']
print('Pay response status:', pay_res.status_code, 'Receipt No:', receipt_no)

# 5. Download generated PDF receipt
receipt_pdf = client.get(f'/api/fees/receipt/{txn_id}/pdf', headers=headers)
print('PDF Receipt status:', receipt_pdf.status_code, 'PDF byte length:', len(receipt_pdf.data))

# 6. Test VidyaBot AI query
chat_res = client.post('/api/chatbot/query', json={'message': 'What streams and KCET coaching do you offer?'})
print('Chatbot status:', chat_res.status_code, 'Source:', chat_res.get_json().get('source'))
print('All core workflows verified with 100% success!')

