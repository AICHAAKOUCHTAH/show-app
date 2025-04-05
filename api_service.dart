import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart'; // Import pour MediaType
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:5000'; // Pour émulateur Android

  // Méthode pour uploader une image
  static Future<void> uploadImage(File image, 
      {required String title, 
       String? description, 
       required String category}) async {
    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('$baseUrl/shows'),
      );

      // Ajouter l'image
      request.files.add(
        await http.MultipartFile.fromPath(
          'image', 
          image.path,
          contentType: MediaType('image', 'jpeg'),
        ),
      );

      // Ajouter les autres champs
      request.fields.addAll({
        'title': title,
        'description': description ?? '',
        'category': category,
      });

      // Ajouter le token si authentification requise
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('auth_token');
      if (token != null) {
        request.headers['Authorization'] = 'Bearer $token';
      }

      final response = await request.send();
      
      if (response.statusCode != 201) {
        final responseBody = await response.stream.bytesToString();
        throw Exception('Échec de l\'upload: ${response.reasonPhrase}, $responseBody');
      }
    } catch (e) {
      throw Exception('Erreur réseau: $e');
    }
  }
}