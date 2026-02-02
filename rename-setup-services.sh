#!/bin/bash

# Script pour renommer tous les fichiers *SetupService.ts en *Setup.ts

# Usage:
# chmod +x rename-setup-services.sh
# ./rename-setup-services.sh src/components

# Si aucun dossier n'est spécifié, utilise le dossier courant

# Définir le dossier cible
TARGET_DIR="${1:-.}"

# Vérifier que le dossier existe
if [ ! -d "$TARGET_DIR" ]; then
    echo "Erreur: Le dossier '$TARGET_DIR' n'existe pas."
    exit 1
fi

echo "Recherche des fichiers *SetupService.ts dans: $TARGET_DIR"
echo ""

# Compteur pour les fichiers renommés
count=0

# Trouver et renommer tous les fichiers SetupService.ts
find "$TARGET_DIR" -type f -name "*SetupService.ts" | while read -r file; do
    # Créer le nouveau nom en remplaçant SetupService.ts par Setup.ts
    new_file="${file%SetupService.ts}Setup.ts"
    
    # Afficher l'opération
    echo "Renommage: $(basename "$file") -> $(basename "$new_file")"
    echo "  Chemin: $file"
    
    # Renommer le fichier
    mv "$file" "$new_file"
    
    ((count++))
done

echo ""
echo "✓ Terminé! $count fichier(s) renommé(s)."
