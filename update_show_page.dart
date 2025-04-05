 import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../models/show.dart';
import '../config/api_config.dart';
import 'package:http/http.dart' as http;

class UpdateShowPage extends StatefulWidget {
  final Show show;

  const UpdateShowPage({Key? key, required this.show}) : super(key: key);

  @override
  _UpdateShowPageState createState() => _UpdateShowPageState();
}