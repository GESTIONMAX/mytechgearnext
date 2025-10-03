#!/bin/bash

# Script d'exécution pour l'import WooCommerce
# Ce script orchestre l'ensemble du processus d'import

set -e  # Arrêter en cas d'erreur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_DIR="$PROJECT_DIR/logs"
DATA_DIR="$PROJECT_DIR/data"

# Fonction de logging
log() {
    local color=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${color}[${timestamp}] ${message}${NC}"
}

# Fonction d'erreur
error() {
    log "$RED" "❌ $1"
    exit 1
}

# Fonction de succès
success() {
    log "$GREEN" "✅ $1"
}

# Fonction d'information
info() {
    log "$BLUE" "ℹ️ $1"
}

# Fonction d'avertissement
warning() {
    log "$YELLOW" "⚠️ $1"
}

# Vérifier les prérequis
check_prerequisites() {
    info "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        error "npm n'est pas installé"
    fi
    
    # Vérifier les variables d'environnement
    if [ -z "$NEXT_PUBLIC_WORDPRESS_URL" ]; then
        error "NEXT_PUBLIC_WORDPRESS_URL n'est pas définie"
    fi
    
    if [ -z "$NEXT_PUBLIC_WC_CONSUMER_KEY" ]; then
        error "NEXT_PUBLIC_WC_CONSUMER_KEY n'est pas définie"
    fi
    
    if [ -z "$NEXT_PUBLIC_WC_CONSUMER_SECRET" ]; then
        error "NEXT_PUBLIC_WC_CONSUMER_SECRET n'est pas définie"
    fi
    
    success "Prérequis vérifiés"
}

# Créer les dossiers nécessaires
setup_directories() {
    info "Création des dossiers nécessaires..."
    
    mkdir -p "$LOG_DIR"
    mkdir -p "$DATA_DIR/import"
    mkdir -p "$DATA_DIR/mapped"
    mkdir -p "$DATA_DIR/import/variants"
    
    success "Dossiers créés"
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --all              Exécuter l'import complet (défaut)"
    echo "  --products         Importer uniquement les produits"
    echo "  --variants         Importer uniquement les variantes"
    echo "  --map              Mapper uniquement les données existantes"
    echo "  --dry-run          Mode simulation (pas de sauvegarde)"
    echo "  --verbose          Affichage détaillé"
    echo "  --help, -h         Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 --all --dry-run --verbose"
    echo "  $0 --variants --verbose"
    echo "  $0 --map --dry-run"
    echo ""
    echo "Variables d'environnement requises:"
    echo "  NEXT_PUBLIC_WORDPRESS_URL"
    echo "  NEXT_PUBLIC_WC_CONSUMER_KEY"
    echo "  NEXT_PUBLIC_WC_CONSUMER_SECRET"
}

# Import complet
run_full_import() {
    info "🚀 Démarrage de l'import complet WooCommerce"
    
    # Étape 1: Import des données de base
    info "📦 Étape 1: Import des données de base..."
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-import.js" --all --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-import.js" --all $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec de l'import des données de base"
    fi
    success "Import des données de base terminé"
    
    # Étape 2: Import spécialisé des variantes
    info "🔀 Étape 2: Import spécialisé des variantes..."
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-variants-import.js" --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-variants-import.js" $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec de l'import des variantes"
    fi
    success "Import des variantes terminé"
    
    # Étape 3: Mapping des données
    info "🗺️ Étape 3: Mapping des données..."
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-data-mapper.js" --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-data-mapper.js" $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec du mapping des données"
    fi
    success "Mapping des données terminé"
    
    success "🎉 Import complet terminé avec succès!"
}

# Import des produits uniquement
run_products_import() {
    info "📦 Import des produits uniquement"
    
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-import.js" --products --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-import.js" --products $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec de l'import des produits"
    fi
    
    success "Import des produits terminé"
}

# Import des variantes uniquement
run_variants_import() {
    info "🔀 Import des variantes uniquement"
    
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-variants-import.js" --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-variants-import.js" $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec de l'import des variantes"
    fi
    
    success "Import des variantes terminé"
}

# Mapping uniquement
run_mapping() {
    info "🗺️ Mapping des données uniquement"
    
    if [ "$DRY_RUN" = "true" ]; then
        node "$SCRIPT_DIR/woocommerce-data-mapper.js" --dry-run $VERBOSE_FLAG
    else
        node "$SCRIPT_DIR/woocommerce-data-mapper.js" $VERBOSE_FLAG
    fi
    
    if [ $? -ne 0 ]; then
        error "Échec du mapping des données"
    fi
    
    success "Mapping des données terminé"
}

# Nettoyer les anciens fichiers
cleanup_old_files() {
    info "🧹 Nettoyage des anciens fichiers..."
    
    # Nettoyer les logs anciens (plus de 7 jours)
    find "$LOG_DIR" -name "*.log" -mtime +7 -delete 2>/dev/null || true
    
    # Nettoyer les données temporaires
    rm -rf "$DATA_DIR/import/temp" 2>/dev/null || true
    
    success "Nettoyage terminé"
}

# Afficher le résumé
show_summary() {
    info "📊 Résumé de l'import:"
    echo ""
    
    if [ -d "$DATA_DIR/import" ]; then
        echo "📁 Données importées:"
        ls -la "$DATA_DIR/import" | grep -E "\.(json)$" | while read line; do
            echo "  $line"
        done
    fi
    
    if [ -d "$DATA_DIR/mapped" ]; then
        echo "🗺️ Données mappées:"
        ls -la "$DATA_DIR/mapped" | grep -E "\.(json)$" | while read line; do
            echo "  $line"
        done
    fi
    
    if [ -d "$LOG_DIR" ]; then
        echo "📝 Logs:"
        ls -la "$LOG_DIR" | grep -E "\.(log)$" | while read line; do
            echo "  $line"
        done
    fi
}

# Fonction principale
main() {
    # Variables par défaut
    IMPORT_TYPE="all"
    DRY_RUN="false"
    VERBOSE_FLAG=""
    
    # Parser les arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --all)
                IMPORT_TYPE="all"
                shift
                ;;
            --products)
                IMPORT_TYPE="products"
                shift
                ;;
            --variants)
                IMPORT_TYPE="variants"
                shift
                ;;
            --map)
                IMPORT_TYPE="map"
                shift
                ;;
            --dry-run)
                DRY_RUN="true"
                shift
                ;;
            --verbose)
                VERBOSE_FLAG="--verbose"
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                error "Option inconnue: $1"
                ;;
        esac
    done
    
    # Afficher le header
    echo ""
    log "$CYAN" "🚀 SCRIPT D'IMPORT WOOCOMMERCE - MyTechGear"
    log "$CYAN" "════════════════════════════════════════════"
    echo ""
    
    # Vérifier les prérequis
    check_prerequisites
    
    # Créer les dossiers
    setup_directories
    
    # Nettoyer les anciens fichiers
    cleanup_old_files
    
    # Exécuter selon le type d'import
    case $IMPORT_TYPE in
        "all")
            run_full_import
            ;;
        "products")
            run_products_import
            ;;
        "variants")
            run_variants_import
            ;;
        "map")
            run_mapping
            ;;
        *)
            error "Type d'import inconnu: $IMPORT_TYPE"
            ;;
    esac
    
    # Afficher le résumé
    echo ""
    show_summary
    
    success "🎉 Script terminé avec succès!"
}

# Exécuter le script principal
main "$@"
